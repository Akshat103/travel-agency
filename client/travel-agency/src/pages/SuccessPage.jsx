import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SuccessAnimation from '../assets/animations/successAnimation.svg';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        if (secondsLeft === 0) {
            navigate('/dashboard');
        }

        return () => clearInterval(timer);
    }, [secondsLeft, navigate]);

    return (
        <div className="p-3" style={{ height: '100vh' }}>
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
                <img src={SuccessAnimation} alt="Success Animation" style={{ width: '400px', margin: '-50px' }} />
                <h4>Success!</h4>
                <p>{message}</p>
                <p>Redirecting to dashboard in {secondsLeft} seconds...</p>
                <Link to='/dashboard'>Go to Dashboard</Link>
            </div>
        </div>
    );
};

export default SuccessPage;
