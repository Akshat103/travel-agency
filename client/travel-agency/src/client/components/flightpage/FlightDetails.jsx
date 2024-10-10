import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarDay, FaMoneyBillWave, FaSuitcase, FaClock } from 'react-icons/fa';
import { ArrowLeft, CreditCard } from 'lucide-react';

const FlightDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { segment, searchKey } = location.state || {};

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
                        <p><CreditCard className="me-2 text-success" /> <strong>Total Amount:</strong> {fare.FareDetails[0].Total_Amount} {fare.FareDetails[0].Currency_Code}</p>
                        <p><FaSuitcase className="me-2 text-warning" /> <strong>Baggage Allowance:</strong> {fare.FareDetails[0].Free_Baggage.Check_In_Baggage} (Check-in), {fare.FareDetails[0].Free_Baggage.Hand_Baggage} (Hand)</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FlightDetails;