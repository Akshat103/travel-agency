import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FlightDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { segment } = location.state || {};

    const bookFare = (fareId, flightKey, price) => {
        navigate('/book-flight', { state: { fareId, flightKey, reprice:segment.Repriced, price } });
    }

    if (!segment) {
        return <div>Flight not found</div>;
    }

    return (
        <div className="container mt-2">
            <button onClick={() => navigate(-1)} className="btn btn-outline-primary">
                <ArrowLeft size={18} className="me-2" /> Back to Flights
            </button>
            <h4 className="mt-2 mb-2">Fare Details</h4>
            {segment.Fares.map((fare, idx) => (
                <div key={idx} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Fare Type: {fare.ProductClass}</h5>
                        <p><strong>{Math.ceil(fare.Seats_Available)}</strong> Seats</p>
                        <button onClick={() => bookFare(fare.Fare_Id, segment.Flight_Key, Math.ceil(fare.FareDetails[0].Total_Amount))} className="btn btn-outline-success">
                            {Math.ceil(fare.FareDetails[0].Total_Amount)} {fare.FareDetails[0].Currency_Code}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FlightDetails;