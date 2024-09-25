import React from 'react';

const DateRangeInput = ({ isRoundTrip, startDate, endDate, onChange }) => {
  return (
    <div className='row'>
      <div className="flight_Search_boxed">
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

      {isRoundTrip && (
        <div className="flight_Search_boxed">
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
      )}

    </div>
  );
};

export default DateRangeInput;
