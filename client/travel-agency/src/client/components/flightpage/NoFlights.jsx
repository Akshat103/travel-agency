import React from 'react';
import NoFlightsAnimation from '../../../assets/animations/noFlightsAnimation.svg';

const NoFlights = () => {
  return (
    <div className="p-3">
      <div style={containerStyle}>
        <img
          src={NoFlightsAnimation}
          alt="No Flights Animation"
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

export default NoFlights;
