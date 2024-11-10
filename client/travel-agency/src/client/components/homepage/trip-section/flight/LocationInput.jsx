import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlightCity } from '../../../../../redux/flightSlice';

const LocationInput = ({ label, onSelect }) => {
    const dispatch = useDispatch();
    const flightCity = useSelector(state => state.flights.flightCity);
    const flightCityLoading = useSelector(state => state.flights.flightCityLoading);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!flightCity && !flightCityLoading) {
            dispatch(fetchFlightCity());
        }
    }, [flightCity, flightCityLoading, dispatch]);

    const filterSuggestions = (searchQuery) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (searchQuery.length > 0 && flightCity) {
            setIsTyping(true);
            timeoutRef.current = setTimeout(() => {
                const filteredSuggestions = flightCity.filter(
                    item =>
                        item.AIRPORTNAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.AIRPORTCODE.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSuggestions(filteredSuggestions);
                setIsTyping(false);
            }, 500);
        } else {
            setSuggestions([]);
            setIsTyping(false);
        }
    };

    useEffect(() => {
        filterSuggestions(query);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [query, flightCity]);

    const handleSelect = (airport) => {
        setSelectedAirport(airport);
        setQuery(`${airport.AIRPORTNAME} (${airport.AIRPORTCODE})`);
        onSelect(airport);
        setSuggestions([]);
    };

    return (
        <div style={{ position: 'relative' }}>
            <p>{label}</p>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter airport or country"
            />

            {isTyping ? (
                <p>Loading suggestions...</p>
            ) : (
                suggestions.length > 0 && (
                    <ul
                        className="suggestions-list"
                        style={{
                            width: '-webkit-fill-available',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            margin: 0,
                            padding: 0,
                            listStyleType: 'none',
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            zIndex: 10,
                            backgroundColor: 'white',
                            border: '1px solid #ddd',
                        }}
                    >
                        {suggestions.map((airport, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(airport)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderBottom: '1px solid #ddd'
                                }}
                            >
                                {airport.AIRPORTNAME} ({airport.AIRPORTCODE}), {airport.COUNTRYNAME}
                            </li>
                        ))}
                    </ul>
                )
            )}
            {selectedAirport ? (
                <span>{selectedAirport.AIRPORTCODE} - {selectedAirport.AIRPORTNAME}</span>
            ) : <span>Name/Code</span>}
        </div>
    );
};

export default LocationInput;
