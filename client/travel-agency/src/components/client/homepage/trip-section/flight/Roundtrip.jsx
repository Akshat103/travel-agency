import React from 'react'
import LocationInput from './LocationInput'
import DateRangeInput from './DateRangeInput'
import PassengerDetails from './PassengerDetails'

const Roundtrip = ({
  flightDetails,
  handleSelectOrigin,
  handleSelectDestination,
  handleDateChange,
  handlePassengerCountChange,
  handleClassChange
}) => {
  return (
    <div class="tab-pane fade" id="roundtrip" role="tabpanel" aria-labelledby="roundtrip-tab">
      <div class="row">
        <div class="col-lg-12">
          <div class="oneway_search_form">
            <form action="#!">
              <div class="row">
                <div class="col-lg-3  col-md-6 col-sm-12 col-12">
                  <div class="flight_Search_boxed">
                    <LocationInput label="From" onSelect={handleSelectOrigin} />
                    <div class="plan_icon_posation">
                      <i class="fas fa-plane-departure"></i>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3  col-md-6 col-sm-12 col-12">
                  <div class="flight_Search_boxed">
                    <LocationInput label="To" onSelect={handleSelectDestination} />
                    <div class="plan_icon_posation">
                      <i class="fas fa-plane-arrival"></i>
                    </div>
                    <div class="range_plan">
                      <i class="fas fa-exchange-alt"></i>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3  col-md-6 col-sm-12 col-12">
                  <div class="form_search_date">
                    <DateRangeInput
                      isRoundTrip={true}
                      startDate={flightDetails.TravelDate}
                      endDate={flightDetails.DepartureDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
                <div class="col-lg-2  col-md-6 col-sm-12 col-12">
                <PassengerDetails
                    flightDetails={flightDetails}
                    onPassengerCountChange={handlePassengerCountChange}
                    onClassChange={handleClassChange}
                  />
                </div>
              </div>
              <div class="top_form_search_button">
                <button class="btn btn_theme btn_md">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roundtrip
