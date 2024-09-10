import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationInput = ({ label, onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState(null);

    useEffect(() => {
        if (query.length > 0) {
            axios.get('/api/flightcity')
                .then(response => {
                    if (response.data.statuscode === '100') {
                        const filteredSuggestions = response.data.data.filter(
                            item =>
                                item.AIRPORTNAME.toLowerCase().includes(query.toLowerCase()) ||
                                item.COUNTRYNAME.toLowerCase().includes(query.toLowerCase())
                        );
                        setSuggestions(filteredSuggestions);
                    }
                })
                .catch(error => {
                    console.error('Error fetching airport data:', error);
                });
        } else {
            setSuggestions([]);
        }
    }, [query]);

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
            {suggestions.length > 0 && (
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
            )}
            {selectedAirport && (
                <span>{selectedAirport.AIRPORTCODE} - {selectedAirport.AIRPORTNAME}</span>
            )}
        </>
    );
};

export default LocationInput;
