import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlightCity } from '../../../../../redux/flightSlice';
import _ from 'lodash';
let tryCount = 0;

const LocationInput = ({ label, onSelect }) => {
    const dispatch = useDispatch();
    const flightCity = useSelector(state => state.flights.flightCity);
    const flightCityLoading = useSelector(state => state.flights.flightCityLoading);

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!flightCity && !flightCityLoading && tryCount<3) {
            dispatch(fetchFlightCity());
            tryCount+=1;
        }
    }, [flightCity, flightCityLoading, dispatch]);

    const debounceFilterSuggestions = useCallback(
        _.debounce((query) => {
            if (query.length > 0 && flightCity) {
                setIsTyping(true);
                const filteredSuggestions = flightCity.filter(
                    item =>
                        item.AIRPORTNAME.toLowerCase().includes(query.toLowerCase()) ||
                        item.AIRPORTCODE.toLowerCase().includes(query.toLowerCase())
                );
                setSuggestions(filteredSuggestions);
                setIsTyping(false);
            } else {
                setSuggestions([]);
                setIsTyping(false);
            }
        }, 500),
        [flightCity]
    );

    useEffect(() => {
        debounceFilterSuggestions(query);
    }, [query, debounceFilterSuggestions]);

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
