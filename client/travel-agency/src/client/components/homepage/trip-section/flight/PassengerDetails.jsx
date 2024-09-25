import React from 'react';
import ClassSelection from './ClassSelection';

const travelClassNames = {
  0: 'Economy',
  1: 'Business',
  2: 'First Class',
  3: 'Premium Economy',
};

const PassengerDetails = ({ flightDetails, onPassengerCountChange, onClassChange, useDropdown }) => {
  const { Adult_Count, Child_Count, Infant_Count, Class_Of_Travel } = flightDetails;
  const class_name = travelClassNames[Class_Of_Travel] || 'Business';
  const totalPassengers = Adult_Count + Child_Count + Infant_Count;

  const PassengerType = ({ type, ageRange, count, onChange }) => (
    <div className="passengers-type">
      <div className="text">
        <span className="count">{count}</span>
        <div className="type-label">
          <p>{type}</p>
          <span>{ageRange}</span>
        </div>
      </div>
      <div className="button-set">
        <button type="button" className="btn-add" onClick={() => onChange(1)}>
          <i className="fas fa-plus"></i>
        </button>
        <button type="button" className="btn-subtract" onClick={() => onChange(-1)}>
          <i className="fas fa-minus"></i>
        </button>
      </div>
    </div>
  );

  const renderPassengerSection = (
    <div className="traveller-calulate-persons">
      <div className="passengers">
        <h6>Passengers</h6>
        <div className="passengers-types">
          <PassengerType
            type="Adult"
            ageRange="12+"
            count={Adult_Count}
            onChange={(change) => onPassengerCountChange('Adult', change)}
          />
          <PassengerType
            type="Child"
            ageRange="2> and <12"
            count={Child_Count}
            onChange={(change) => onPassengerCountChange('Child', change)}
          />
          <PassengerType
            type="Infant"
            ageRange="<2"
            count={Infant_Count}
            onChange={(change) => onPassengerCountChange('Infant', change)}
          />
        </div>
      </div>
      <ClassSelection
        selectedClass={Class_Of_Travel}
        onClassChange={onClassChange}
        travelClassNames={travelClassNames}
      />
    </div>
  );

  return (
    <div className="flight_Search_boxed dropdown_passenger_area">
      <p>Passenger, Class</p>
      {useDropdown ? (
        <div className="dropdown">
          <button
            className="dropdown-toggle final-count"
            type="button"
            id="dropdownMenuButton1"
            data-toggle="dropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {`${totalPassengers} Passenger${totalPassengers > 1 ? 's' : ''}`}
          </button>
          <div className="dropdown-menu dropdown_passenger_info" aria-labelledby="dropdownMenuButton1">
            {renderPassengerSection}
          </div>
          <span>{class_name}</span>
        </div>
      ) : (
        renderPassengerSection
      )}
    </div>
  );
};

export default PassengerDetails;
