import React from 'react';
import DatePicker from 'react-datepicker';

const DateRangeInput = ({ onHome, isRoundTrip, startDate, endDate, onChange }) => {

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : '';
  };

  return (
    <div className={`${!onHome ? '' : isRoundTrip ? 'col-lg-5 col-md-6 col-sm-12 col-12' : 'col-lg-3 col-md-6 col-sm-12 col-12'}`}>
      <div className={`${onHome ? 'row' : 'col'}`}>
        <div className={`${!onHome ? '' : isRoundTrip ? 'col-12 col-md-6' : ''}`}>
          <div className="flight_Search_boxed">
            <div className="Journey_date">
              <p>Journey date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => onChange(date, endDate)}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/dd/yyyy"
                showYearDropdown
                showMonthDropdown
                minDate={new Date()}
                scrollableYearDropdown
              />
              <span>{startDate ? formatDate(startDate) : 'Date'}</span>
            </div>
          </div>
        </div>

        {isRoundTrip && (
          <div className={`${!onHome ? '' : isRoundTrip ? 'col-12 col-md-6' : ''}`}>
            <div className="flight_Search_boxed">
              <div className="Return_date">
                <p>Return date</p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => onChange(startDate, date)}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/dd/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  minDate={startDate ? new Date(startDate) : new Date()}
                  scrollableYearDropdown
                />
                <span>{endDate ? formatDate(endDate) : 'Date'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeInput;
