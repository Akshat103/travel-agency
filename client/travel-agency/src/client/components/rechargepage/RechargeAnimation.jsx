import React from 'react';
import RechargeAnimationImage from '../../../assets/animations/rechargeAnimation.svg';

const RechargeAnimation = () => {
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
          src={RechargeAnimationImage}
          alt="Recharge Animation"
          style={{ width: '200px', marginBottom: '20px' }}
        />
      </div>
    </div>
  );
};

export default RechargeAnimation;
