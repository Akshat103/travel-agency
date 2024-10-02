import React from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarDay, FaMapMarkerAlt } from 'react-icons/fa';
import { Info, ArrowLeft, ArrowRight } from 'lucide-react';

const ListFlights = ({ flights, isSearching }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const flightsPerPage = 4;
    const navigate = useNavigate();

    const handleViewDetails = (flight) => {
        navigate('/flight-details', { state: { flight } });
    };

    if (isSearching) {
        return (
            <div className="p-3">
                <h4>Flights</h4>
                <Skeleton count={5} height={150} />
            </div>
        );
    }

    if (!flights || flights.length === 0) {
        return (
            <div className="p-3">
                <h4>Flights</h4>
                <p>No flights found.</p>
            </div>
        );
    }

    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(flights.length / flightsPerPage);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    return (
        <div className="p-3">
            <h4 className="mb-4">Flights</h4>
            <div className="row">
                {currentFlights.map((flight, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-3">{flight.Airline_Code} {flight.Flight_Numbers}</h5>
                                <p className="card-text">
                                    <FaPlaneDeparture className="me-2 text-primary" /> <strong>From:</strong> {flight.Origin}
                                    <br />
                                    <FaPlaneArrival className="me-2 text-primary" /> <strong>To:</strong> {flight.Destination}
                                    <br />
                                    <FaCalendarDay className="me-2 text-primary" /> <strong>Date:</strong> {flight.TravelDate}
                                </p>
                                <button 
                                    onClick={() => handleViewDetails(flight)} 
                                    className="btn btn-primary"
                                >
                                    <Info size={18} className="me-2" /> View Details
                                </button>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Flight ID:</strong> {flight.Flight_Id}
                                </li>
                                <li className="list-group-item">
                                    <FaMapMarkerAlt className="me-2 text-success" /> <strong>Segments:</strong>
                                    {flight.Segments.map((segment, idx) => (
                                        <span key={idx} className="d-block ms-3">
                                            {segment.Flight_Number} ({segment.Origin} to {segment.Destination})
                                        </span>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${!hasPreviousPage ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => hasPreviousPage && paginate(currentPage - 1)}>
                            <ArrowLeft size={18} /> Previous
                        </button>
                    </li>
                    <li className="page-item active">
                        <span className="page-link">
                            {currentPage}
                        </span>
                    </li>
                    <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => hasNextPage && paginate(currentPage + 1)}>
                            Next <ArrowRight size={18} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ListFlights;