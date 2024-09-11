import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarDay, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';
import Modal from '../../modal/Modal';
import flightsData from './test.json';

const ListFlights = ({ flights, isSearching }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    flights = flightsData.Flights;

    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage = 9;

    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                <Skeleton count={5} height={50} />
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

    return (
        <div className="p-3">
            <h4>Flights</h4>
            <div className="row">
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
                                <button onClick={() => openModal(flight)} className="btn btn-primary">
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

            {/* Pagination Controls */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(flights.length / flightsPerPage) }, (_, index) => (
                        <li
                            key={index}
                            className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                            onClick={() => paginate(index + 1)}
                        >
                            <a className="page-link" href="#">
                                {index + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Modal for selected flight */}
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
                                        <strong>Basic Amount:</strong> {fare.FareDetails[0].Basic_Amount} {fare.FareDetails[0].Currency_Code}
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
                                            <strong>Flight Number:</strong> {segment.Airline_Name}
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
