import React from 'react';
import spin from '../assets/spinner.svg';

const Spinner = ({ show }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      <img src={spin} alt="Loading..." />
    </div>
  );
};

export default Spinner;
