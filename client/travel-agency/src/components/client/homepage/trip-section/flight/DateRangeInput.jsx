import React from 'react';

const DateRangeInput = ({ isRoundTrip, startDate, endDate, onChange }) => {
  return (
    <div className="form_search_date">
      <div className="flight_Search_boxed date_flex_area">
        <div className="Journey_date">
          <p>Journey date</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onChange(e.target.value, endDate)}
          />
        </div>
        {isRoundTrip && (
          <div className="Return_date">
            <p>Return date</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onChange(startDate, e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeInput;