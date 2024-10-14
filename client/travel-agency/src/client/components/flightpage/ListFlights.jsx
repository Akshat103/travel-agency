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
    const flightsPerPage = 6;
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const handleViewDetails = (flight) => {
        console.log(flight)
        navigate('/flight-details', { state: { flight } });
    };

    useEffect(() => {
        if (flights && flights.length > 0) {
            setDisplayedFlights(flights.slice(0, flightsPerPage));
        }
    }, [flights]);

    const loadMoreFlights = () => {
        if (displayedFlights.length < flights.length) {
            setDisplayedFlights(prevFlights => [
                ...prevFlights,
                ...flights.slice(prevFlights.length, prevFlights.length + flightsPerPage),
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
        <div ref={containerRef} className="scroll-container p-4">
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
                                                        <strong>₹{flight.Fares[0].FareDetails[0].Total_Amount}</strong>
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
            {displayedFlights.length === flights.length && <p className="text-center text-gray-500">No more flights available.</p>}
        </div>
    );
};

export default ListFlights;