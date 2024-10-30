import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SeatLayout from './SeatLayout';

const BusDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus } = location.state || {};

  const [selectedBoarding, setSelectedBoarding] = useState('');
  const [selectedDropping, setSelectedDropping] = useState('');

  useEffect(() => {
    if (bus) {
      setSelectedBoarding(bus.boardingTimes[0].bpId);
      setSelectedDropping(bus.droppingTimes[0].bpId);
    }
  }, [bus]);

  const handleBoardingChange = (event) => {
    setSelectedBoarding(event.target.value);
  };

  const handleDroppingChange = (event) => {
    setSelectedDropping(event.target.value);
  };

  if (!bus) {
    return <div>Bus not found</div>;
  }

  return (
    <div className="container my-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-4">
        <ArrowLeft size={18} className="me-2" /> Back to Buses
      </button>
      <h2 className="mb-4">{bus.travels}</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <h5 className="font-semibold">Departure</h5>
              <p>{bus.Departure_Time}</p>
            </div>
            <div className="col-md-6">
              <h5 className="font-semibold">Arrival</h5>
              <p>{bus.Arrival_Time}</p>
            </div>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold">Available Seats</h5>
            <p>{bus.availableSeats}</p>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <h5 className="font-semibold mb-2">Boarding Points</h5>
              <select
                className="form-select"
                value={selectedBoarding}
                onChange={handleBoardingChange}
              >
                {bus.boardingTimes.map((point) => (
                  <option key={point.bpId} value={point.bpId}>
                    {point.bpName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <h5 className="font-semibold mb-2">Dropping Points</h5>
              <select
                className="form-select"
                value={selectedDropping}
                onChange={handleDroppingChange}
              >
                {bus.droppingTimes.map((point) => (
                  <option key={point.bpId} value={point.bpId}>
                    {point.bpName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold mb-2">Fare Options</h5>
            <div className="row">
              {bus.fareDetails.map((fare, index) => (
                <div key={index} className="col-md-2">
                  <div className="card">
                    <div className="card-body">
                      <h6 >₹{Math.ceil(fare.totalFare)}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Seats</h5>
            <SeatLayout
              bus={bus}
              selectedBoarding={selectedBoarding}
              selectedDropping={selectedDropping}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails
