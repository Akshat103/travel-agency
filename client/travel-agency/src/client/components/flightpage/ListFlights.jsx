import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarDay, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';
import Modal from '../../../components/modal/Modal';
import { Link } from 'react-router-dom';

const ListFlights = ({ flights, isSearching }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage = 9;

    const openModal = (flight) => {
        setSelectedFlight(flight);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedFlight(null);
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
            <h4>Flights</h4>
            <div className="col">
                {currentFlights.map((flight, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">
                                    <FaPlaneDeparture /> <strong>From:</strong> {flight.Origin}
                                    <br />
                                    <FaPlaneArrival /> <strong>To:</strong> {flight.Destination}
                                    <br />
                                    <FaCalendarDay /> <strong>Date:</strong> {flight.TravelDate}
                                </p>
                                <button onClick={() => openModal(flight)} className="btn btn-secondary">
                                    <FaInfoCircle /> View Details
                                </button>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Flight ID:</strong> {flight.Flight_Id}
                                </li>
                                <li className="list-group-item">
                                    <strong>Flight Numbers:</strong> {flight.Flight_Numbers}
                                </li>
                                <li className="list-group-item">
                                    <FaMapMarkerAlt /> <strong>Segments:</strong>
                                    {flight.Segments.map((segment, idx) => (
                                        <span key={idx} className="d-block">
                                            {segment.Flight_Number} ({segment.Origin} to {segment.Destination})
                                        </span>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${!hasPreviousPage ? 'disabled' : ''}`}>
                        <Link className="page-link" to="#" onClick={() => hasPreviousPage && paginate(currentPage - 1)}>
                            Previous
                        </Link>
                    </li>
                    <li className="page-item active">
                        <Link className="page-link" to="#">
                            {currentPage}
                        </Link>
                    </li>
                    <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
                        <Link className="page-link" to="#" onClick={() => hasNextPage && paginate(currentPage + 1)}>
                            Next
                        </Link>
                    </li>
                </ul>
            </nav>

            {selectedFlight && (
                <Modal isOpen={modalIsOpen} onClose={closeModal}>
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <p><strong>Flight ID:</strong> {selectedFlight.Flight_Id}</p>
                                <p><strong>Origin:</strong> {selectedFlight.Origin}</p>
                                <p><strong>Destination:</strong> {selectedFlight.Destination}</p>
                                <p><strong>Travel Date:</strong> {selectedFlight.TravelDate}</p>
                            </div>
                            <div className="col-md-6">
                                <h4>Fares</h4>
                                {selectedFlight.Fares.map((fare, idx) => (
                                    <div key={idx} className="fare-info">
                                        <strong>Total Amount:</strong> {fare.FareDetails[0].Total_Amount} {fare.FareDetails[0].Currency_Code}
                                        <br />
                                        <strong>Seats Available:</strong> {fare.Seats_Available}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="row mb-4">
                            <h4 className="col-12">Segments</h4>
                            {selectedFlight.Segments.map((segment, idx) => (
                                <div key={idx} className="col-md-6">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <strong>Flight Number:</strong> {segment.Flight_Number}
                                            <br />
                                            <strong>Airline Name:</strong> {segment.Airline_Name}
                                            <br />
                                            <FaPlaneDeparture /> Departure: {segment.Departure_DateTime}
                                            <br />
                                            <FaPlaneArrival /> Arrival: {segment.Arrival_DateTime}
                                            <br />
                                            Duration: {segment.Duration}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ListFlights;
