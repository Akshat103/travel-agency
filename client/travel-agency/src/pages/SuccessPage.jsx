import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1>Success!</h1>
            <p>{message}</p>
            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
    );
};

export default SuccessPage;
