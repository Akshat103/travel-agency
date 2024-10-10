import React from 'react';

const DateRangeInput = ({ onHome, isRoundTrip, startDate, endDate, onChange }) => {
  return (
    <div className={`${!onHome ? '' : isRoundTrip ? 'col-lg-5 col-md-6 col-sm-12 col-12' : 'col-lg-3 col-md-6 col-sm-12 col-12'}`}>
    <div className={`${onHome ? 'row' : 'col'}`}>
    <div className={`${!onHome ? '' : isRoundTrip ? 'col-12 col-md-6' : ''}`}>
        <div className="flight_Search_boxed m-2">
          <div className="Journey_date">
            <p>Journey date</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onChange(e.target.value, endDate)}
            />
            <span style={{ color: "transparent" }}>date</span>
          </div>
        </div>
      </div>

      {isRoundTrip && (
        <div className={`${!onHome ? '' : isRoundTrip ? 'col-12 col-md-6' : ''}`}>
          <div className="flight_Search_boxed m-2">
            <div className="Return_date">
              <p>Return date</p>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onChange(startDate, e.target.value)}
              />
              <span style={{ color: "transparent" }}>date</span>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default DateRangeInput;
