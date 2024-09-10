import React from 'react';
import LocationInput from './LocationInput';
import DateRangeInput from './DateRangeInput';
import PassengerDetails from './PassengerDetails';

const Oneway = ({
  flightDetails,
  handleSelectOrigin,
  handleSelectDestination,
  handleDateChange,
  handlePassengerCountChange,
  handleClassChange
}) => {
  return (
    <div className="tab-pane fade show active" id="oneway_flight" role="tabpanel" aria-labelledby="oneway-tab">
      <div className="row">
        <div className="col-lg-12">
          <div className="oneway_search_form">
            <form action="#!">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="flight_Search_boxed">
                    <LocationInput label="From" onSelect={handleSelectOrigin} />
                    <div className="plan_icon_posation">
                      <i className="fas fa-plane-departure"></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="flight_Search_boxed">
                    <LocationInput label="To" onSelect={handleSelectDestination} />
                    <div className="plan_icon_posation">
                      <i className="fas fa-plane-arrival"></i>
                    </div>
                    <div className="range_plan">
                      <i className="fas fa-exchange-alt"></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                  <DateRangeInput
                    isRoundTrip={false}
                    startDate={flightDetails.TravelDate}
                    endDate={flightDetails.DepartureDate}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                  <PassengerDetails
                    flightDetails={flightDetails}
                    onPassengerCountChange={handlePassengerCountChange}
                    onClassChange={handleClassChange}
                  />
                </div>
                <div className="top_form_search_button">
                  <button className="btn btn_theme btn_md">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oneway;
