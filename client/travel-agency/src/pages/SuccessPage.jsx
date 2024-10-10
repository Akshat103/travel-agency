import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const animationContainer = useRef(null);
    const [animationData, setAnimationData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        import('../assets/animations/successAnimation.json')
            .then((data) => {
                setAnimationData({ ...data });
            })
            .catch((error) => {
                console.error('Error loading animation data:', error);
            });
    }, []);

    useEffect(() => {
        if (animationData) {
            const animation = lottie.loadAnimation({
                container: animationContainer.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData,
            });

            return () => {
                animation.destroy();
            };
        }
    }, [animationData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 500);

        if (secondsLeft === 0) {
            navigate('/dashboard');
        }

        return () => clearTimeout(timer);
    }, [secondsLeft, navigate]);

    return (
        <div className="p-3">
            <div
                style={{
                    height: '60vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <div
                    ref={animationContainer}
                    style={{ width: '400px', margin: '-50px' }}
                />
                <h4>Success!</h4>
                <p>{message}</p>
                <p>Redirecting to dashboard in {secondsLeft} seconds...</p>
                <Link to='dashboard'>Go to Dashboard</Link>
            </div>
        </div>
    );
};

export default SuccessPage;
