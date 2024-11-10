import React from 'react';
import NoHotelAnimation from '../../../assets/animations/NoHotelAnimation.svg';

const NoHotel = () => {
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
          src={NoHotelAnimation}
          alt="No Hotel Animation"
          style={{ width:'15rem', marginBottom: '20px' }}
        />
      </div>
    </div>
  );
};

export default NoHotel;
