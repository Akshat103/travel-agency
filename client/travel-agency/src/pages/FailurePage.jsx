import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FailureAnimation from '../assets/animations/failureAnimation.svg';

const FailurePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = location.state?.errorMessage || "An error occurred";
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
                <img
                    src={FailureAnimation}
                    alt="Failure Animation"
                    style={{ width: '400px', margin: '-50px' }}
                />
                <h4>Oops! Something went wrong</h4>
                <p>{errorMessage}</p>
                <p>Redirecting to dashboard in {secondsLeft} seconds...</p>
                <Link to='/dashboard'>Go to Dashboard</Link>
            </div>
        </div>
    );
};

export default FailurePage;
