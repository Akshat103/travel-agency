import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundAnimation from '../assets/animations/page404.svg';

const NotFound = () => {
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
          src={PageNotFoundAnimation}
          alt="404 Page Not Found"
          style={{ width: '400px', marginBottom: '20px' }}
        />
        <p>The page you are looking for does not exist.</p>
        <Link to='/'>Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
