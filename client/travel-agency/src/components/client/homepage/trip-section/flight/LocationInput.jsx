import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash'; 

const LocationInput = ({ label, onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [airportsData, setAirportsData] = useState([]);

    useEffect(() => {
        axios.get('/api/flightcity')
            .then(response => {
                if (response.data.statuscode === '100') {
                    setAirportsData(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching airport data:', error);
            });
    }, []);

    const debounceFilterSuggestions = useCallback(
        _.debounce((query) => {
            if (query.length > 0) {
                setIsTyping(true);
                const filteredSuggestions = airportsData.filter(
                    item =>
                        item.AIRPORTNAME.toLowerCase().includes(query.toLowerCase()) ||
                        item.COUNTRYNAME.toLowerCase().includes(query.toLowerCase())
                );
                setSuggestions(filteredSuggestions);
                setIsTyping(false);
            } else {
                setSuggestions([]);
                setIsTyping(false);
            }
        }, 500),
        [airportsData]
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
        <>
            <div>
                <p>{label}</p>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter airport or country"
                />
            </div>
            {isTyping ? (
                <p>Loading suggestions...</p>
            ) : (
                suggestions.length > 0 && (
                    <ul className="suggestions-list" style={{ maxHeight: '150px', overflowY: 'auto', margin: 0, padding: 0, listStyleType: 'none' }}>
                        {suggestions.map((airport, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(airport)}
                                style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #ddd' }}
                            >
                                {airport.AIRPORTNAME} ({airport.AIRPORTCODE}), {airport.COUNTRYNAME}
                            </li>
                        ))}
                    </ul>
                )
            )}
            {selectedAirport && (
                <span>{selectedAirport.AIRPORTCODE} - {selectedAirport.AIRPORTNAME}</span>
            )}
        </>
    );
};

export default LocationInput;
