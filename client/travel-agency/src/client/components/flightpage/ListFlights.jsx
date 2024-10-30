import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { Clock10Icon } from 'lucide-react';
import NoFlights from './NoFlights';
import { useSelector } from 'react-redux';

const ListFlights = ({ isSearching }) => {
    const flights = useSelector((state) => state.flights.searchResult);
    const [displayedFlights, setDisplayedFlights] = useState([]);
    const [selectedAirlines, setSelectedAirlines] = useState(new Set());
    const flightsPerPage = 6;
    const navigate = useNavigate();
    const containerRef = useRef(null);

    // Get unique airline names
    const uniqueAirlines = flights ? [...new Set(flights.map(flight => flight.Segments[0].Airline_Name))].sort() : [];

    const handleAirlineToggle = (airline) => {
        setSelectedAirlines(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(airline)) {
                newSelected.delete(airline);
            } else {
                newSelected.add(airline);
            }
            return newSelected;
        });
    };

    // Filter flights based on selected airlines
    useEffect(() => {
        if (flights && flights.length > 0) {
            const filteredFlights = selectedAirlines.size === 0
                ? flights
                : flights.filter(flight => selectedAirlines.has(flight.Segments[0].Airline_Name));
            setDisplayedFlights(filteredFlights.slice(0, flightsPerPage));
        }
    }, [flights, selectedAirlines]);

    const handleViewDetails = (flight) => {
        navigate('/flight-details', { state: { flight } });
    };

    const loadMoreFlights = () => {
        if (displayedFlights.length < flights.length) {
            const filteredFlights = selectedAirlines.size === 0
                ? flights
                : flights.filter(flight => selectedAirlines.has(flight.Segments[0].Airline_Name));

            setDisplayedFlights(prevFlights => [
                ...prevFlights,
                ...filteredFlights.slice(prevFlights.length, prevFlights.length + flightsPerPage),
            ]);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                loadMoreFlights();
            }
        };

        const ref = containerRef.current;
        if (ref) {
            ref.addEventListener('scroll', handleScroll);
            return () => ref.removeEventListener('scroll', handleScroll);
        }
    }, [flights, displayedFlights]);

    if (isSearching) {
        return (
            <div className="p-3">
                <Skeleton count={8} height={150} />
            </div>
        );
    }

    if (!flights || flights.length === 0) {
        return (
            <div className="p-3">
                <NoFlights />
            </div>
        );
    }

    function convertDuration(duration) {
        const [hours, minutes] = duration.split(':');
        const h = parseInt(hours, 10);
        const m = parseInt(minutes, 10);
        return `${h}h ${m}m`;
    }

    return (
        <div className="p-4">
            {/* Airline Filters */}
            <div className="mb-4">
                <div className="text-lg font-semibold mb-2">Filter by Airlines:</div>
                <div style={{ display: 'flex', gap: '2rem', overflow:'auto'}}>
                    {uniqueAirlines.map((airline, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`airline-${index}`}
                                className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                                checked={selectedAirlines.has(airline)}
                                onChange={() => handleAirlineToggle(airline)}
                            />
                            <label htmlFor={`airline-${index}`} className="ml-2 text-sm font-medium">
                                {airline}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div ref={containerRef} className="scroll-container">
                <div className="row">
                    {displayedFlights.map((flight, index) => (
                        <div key={index} className="col-12 mb-3">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">
                                        <strong>{flight.Segments[0].Airline_Name}</strong>
                                        <div className="inner-div">
                                            {flight.Segments.map((segment, segIndex) => (
                                                <span key={segIndex}>
                                                    {segment.Origin}
                                                    {segIndex < flight.Segments.length && " - "}
                                                </span>
                                            ))}
                                            <span>{flight.Segments[flight.Segments.length - 1].Destination}</span>
                                        </div>
                                    </h5>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="inner-div">
                                                <div>
                                                    <FaPlaneDeparture className="me-2 text-primary" />
                                                    {flight.Segments[0].Origin_City} ({flight.Segments[0].Origin})
                                                </div>
                                                <div>
                                                    <Clock10Icon className="me-2 text-primary" />
                                                    {flight.Segments[0].Departure_DateTime}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="inner-div">
                                                <div className="text-decoration-underline">
                                                    {convertDuration(flight.Segments[flight.Segments.length - 1].Duration)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="inner-div">
                                                <div>
                                                    <FaPlaneArrival className="me-2 text-primary" />
                                                    {flight.Segments[flight.Segments.length - 1].Destination_City}
                                                </div>
                                                <div>
                                                    <Clock10Icon className="me-2 text-primary" />
                                                    {flight.Segments[flight.Segments.length - 1].Arrival_DateTime}
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-6 ms-auto">
                                                        <button
                                                            onClick={() => handleViewDetails(flight)}
                                                            className="btn btn-primary d-flex align-items-center"
                                                        >
                                                            <strong>₹{Math.ceil(flight.Fares[0].FareDetails[0].Total_Amount)}</strong>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {displayedFlights.length === 0 && <p className="text-center text-gray-500">No flights found for selected airlines.</p>}
                {selectedAirlines.size === 0 && displayedFlights.length === flights.length && (
                    <p className="text-center text-gray-500">No more flights available.</p>
                )}
            </div>
        </div>
    );
};

export default ListFlights;