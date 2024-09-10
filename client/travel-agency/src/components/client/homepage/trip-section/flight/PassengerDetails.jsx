import React from 'react';
import ClassSelection from './ClassSelection';

const PassengerDetails = ({ flightDetails, onPassengerCountChange, onClassChange }) => {
    const { Adult_Count, Child_Count, Infant_Count, Class_Of_Travel } = flightDetails;

    return (
        <div className="flight_Search_boxed dropdown_passenger_area">
            <p>Passenger, Class</p>
            <div className="dropdown">
                <button
                    className="dropdown-toggle final-count"
                    data-toggle="dropdown"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {`${Adult_Count + Child_Count + Infant_Count} Passenger${Adult_Count + Child_Count + Infant_Count > 1 ? 's' : ''}`}
                </button>
                <div className="dropdown-menu dropdown_passenger_info" aria-labelledby="dropdownMenuButton1">
                    <div className="traveller-calulate-persons">
                        <div className="passengers">
                            <h6>Passengers</h6>
                            <div className="passengers-types">
                                <PassengerType type="Adult" ageRange="12+ yrs" count={Adult_Count} onChange={(change) => onPassengerCountChange('Adult', change)} />
                                <PassengerType type="Child" ageRange="2 - Less than 12 yrs" count={Child_Count} onChange={(change) => onPassengerCountChange('Child', change)} />
                                <PassengerType type="Infant" ageRange="Less than 2 yrs" count={Infant_Count} onChange={(change) => onPassengerCountChange('Infant', change)} />
                            </div>
                        </div>
                        <ClassSelection selectedClass={Class_Of_Travel} onClassChange={onClassChange} />
                    </div>
                </div>
            </div>
            <span>{Class_Of_Travel || 'Business'}</span>
        </div>
    );
};

const PassengerType = ({ type, ageRange, count, onChange }) => {
    return (
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
};

export default PassengerDetails;
