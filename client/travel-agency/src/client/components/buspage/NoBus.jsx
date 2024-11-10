import React from 'react';
import NoBusAnimation from '../../../assets/animations/noBusAnimation.svg';

const NoBus = () => {
  return (
    <div className="p-3">
      <div style={containerStyle}>
        <img
          src={NoBusAnimation}
          alt="No Bus Animation"
          style={animationStyle}
        />
      </div>
    </div>
  );
};

// Styles outside component to avoid re-rendering
const containerStyle = {
  height: '60vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
};

const animationStyle = {
  width: '500px',
  marginBottom: '20px',
};

export default NoBus;
