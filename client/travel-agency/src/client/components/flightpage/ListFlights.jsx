import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { Clock10Icon } from 'lucide-react';
import NoFlights from './NoFlights';

const ListFlights = ({ flights, isSearching }) => {
    const [displayedSegments, setDisplayedSegments] = React.useState([]);
    const flightsPerPage = 6;
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const extractTime = (arrivalDateTime) => {
        const parts = arrivalDateTime.split(' ');
        return parts[1];
    };

    const handleViewDetails = (segment) => {
        navigate('/flight-details', { state: { segment } });
    };

    useEffect(() => {
        if (flights && flights.length > 0) {
            const allSegments = flights.flatMap(flight =>
                flight.Segments.map(segment => ({
                    ...segment,
                    TravelDate: flight.TravelDate,
                    Fares: flight.Fares,
                }))
            );
            setDisplayedSegments(allSegments.slice(0, flightsPerPage));
        }
    }, [flights]);

    const loadMoreSegments = () => {
        if (displayedSegments.length < flights.length) {
            const allSegments = flights.flatMap(flight =>
                flight.Segments.map(segment => ({
                    ...segment,
                    TravelDate: flight.TravelDate,
                    Fares: flight.Fares,
                }))
            );
            setDisplayedSegments(prevSegments => [
                ...prevSegments,
                ...allSegments.slice(prevSegments.length, prevSegments.length + flightsPerPage),
            ]);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                loadMoreSegments();
            }
        };

        const ref = containerRef.current;
        if (ref) {
            ref.addEventListener('scroll', handleScroll);
            return () => ref.removeEventListener('scroll', handleScroll);
        }
    }, [flights, displayedSegments]);

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
                <NoFlights/>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="scroll-container p-4">
            <div className="row">
                {displayedSegments.map((segment, index) => (
                    <div key={index} className="col-12 mb-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-3"><strong>{segment.Airline_Name}</strong></h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="inner-div">
                                            <div>
                                                <FaPlaneDeparture className="me-2 text-primary" /> <strong>From:</strong> {segment.Origin_City} ({segment.Origin})
                                            </div>
                                            <div>
                                                <Clock10Icon className="me-2 text-primary" /> {extractTime(segment.Arrival_DateTime)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-div">
                                            <div>
                                                <FaPlaneArrival className="me-2 text-primary" /> <strong>To:</strong> {segment.Destination_City} ({segment.Destination})
                                            </div>
                                            <div>
                                                <Clock10Icon className="me-2 text-primary" /> {extractTime(segment.Departure_DateTime)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6 d-flex justify-content-start">
                                        <strong>₹{segment.Fares[0].FareDetails[0].Total_Amount}</strong>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <button
                                            onClick={() => handleViewDetails(segment)}
                                            className="btn btn-primary d-flex align-items-center"
                                        >
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {displayedSegments.length === flights.length && <p className="text-center text-gray-500">No more flights available.</p>}
        </div>
    );
};

export default ListFlights;
