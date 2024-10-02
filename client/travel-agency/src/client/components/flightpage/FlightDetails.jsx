import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarDay, FaMoneyBillWave, FaSuitcase, FaClock } from 'react-icons/fa';
import { ArrowLeft, CreditCard } from 'lucide-react';

const FlightDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { flight, searchKey } = location.state || {};
    if (!flight) {
        return <div>Flight not found</div>;
    }

    return (
        <div className="container my-5">
            <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-4">
                <ArrowLeft size={18} className="me-2" /> Back to Flights
            </button>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="card-title mb-4">{flight.Airline_Code} {flight.Flight_Numbers}</h3>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <p><FaPlaneDeparture className="me-2 text-primary" /> <strong>From:</strong> {flight.Origin}</p>
                            <p><FaPlaneArrival className="me-2 text-primary" /> <strong>To:</strong> {flight.Destination}</p>
                            <p><FaCalendarDay className="me-2 text-primary" /> <strong>Travel Date:</strong> {flight.TravelDate}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Flight ID:</strong> {flight.Flight_Id}</p>
                            <p><FaMoneyBillWave className="me-2 text-success" /> <strong>Refundable:</strong> {flight.Fares[0].Refundable ? 'Yes' : 'No'}</p>
                            <p><FaSuitcase className="me-2 text-warning" /> <strong>Seats Available:</strong> {flight.Fares[0].Seats_Available}</p>
                        </div>
                    </div>
                    <h4 className="mb-3">Segments</h4>
                    {flight.Segments.map((segment, idx) => (
                        <div key={idx} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{segment.Airline_Name} - Flight {segment.Flight_Number}</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><FaPlaneDeparture className="me-2 text-primary" /> <strong>Departure:</strong> {segment.Departure_DateTime}</p>
                                        <p><FaPlaneArrival className="me-2 text-primary" /> <strong>Arrival:</strong> {segment.Arrival_DateTime}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><FaClock className="me-2 text-info" /> <strong>Duration:</strong> {segment.Duration}</p>
                                        <p><strong>Aircraft:</strong> {segment.Aircraft_Type}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h4 className="mt-4 mb-3">Fare Details</h4>
                    {flight.Fares.map((fare, idx) => (
                        <div key={idx} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Fare Type: {fare.ProductClass}</h5>
                                <p><CreditCard className="me-2 text-success" /> <strong>Total Amount:</strong> {fare.FareDetails[0].Total_Amount} {fare.FareDetails[0].Currency_Code}</p>
                                <p><FaSuitcase className="me-2 text-warning" /> <strong>Baggage Allowance:</strong> {fare.FareDetails[0].Free_Baggage.Check_In_Baggage} (Check-in), {fare.FareDetails[0].Free_Baggage.Hand_Baggage} (Hand)</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlightDetails;