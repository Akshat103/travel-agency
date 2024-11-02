import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSource, setDestination, setJourneyDate, setSourceList, setDestinationList, setSourceName, setDestinationName } from '../../../../redux/busSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

const Bus = ({ layout, onSearch }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { journeyDate, sourceList, destinationList } = useSelector((state) => state.bus);
    const [sourceInput, setSourceInput] = useState('');
    const [destinationInput, setDestinationInput] = useState('');
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    const fetchSourceList = async () => {
        try {
            const response = await axios.get('/api/getSourceList');
            dispatch(setSourceList(response.data));
        } catch (error) {
            console.error("Error fetching source list:", error);
        }
    };

    const debouncedFetchSourceList = useCallback(
        debounce(() => {
            if (sourceList.length === 0) {
                fetchSourceList();
            }
        }, 300),
        [sourceList]
    );

    const filterSources = (value) => {
        return sourceList
            .filter(source => source.name.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5);
    };

    useEffect(() => {
        debouncedFetchSourceList();
    })

    const handleSourceChange = (e) => {
        const value = e.target.value;
        setSourceInput(value);
        setSourceSuggestions(filterSources(value));
    };

    const fetchDestinationList = async (sourceId) => {
        try {
            const response = await axios.post('/api/getDestinationList', { source: sourceId });
            dispatch(setDestinationList(response.data));
        } catch (error) {
            console.error("Error fetching destination list:", error);
        }
    };

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestinationInput(value);
        setDestinationSuggestions(
            destinationList
                .filter(dest => dest.name.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 5)
        );
    };

    const handleDestinationSuggestionClick = (suggestion) => {
        setDestinationInput(suggestion.name);
        dispatch(setDestination(suggestion.id));
        dispatch(setDestinationName(suggestion.name));
        setDestinationSuggestions([]);
    };

    const handleSourceSuggestionClick = (suggestion) => {
        setSourceInput(suggestion.name);
        dispatch(setSource(suggestion.id));
        dispatch(setSourceName(suggestion.name));
        setSourceSuggestions([]);
        fetchDestinationList(suggestion.id);
        setDestinationInput('');
        setDestinationSuggestions([]);
    };

    const handleJourneyDateChange = (date) => {
        dispatch(setJourneyDate(date));
    };

    const handleSearchClick = () => {
        if (layout === "col") {
            onSearch();
        } else {
            navigate('/bus');
        }
    };

    function debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }

    return (
        <div className="tab-pane" id="bus" role="tabpanel" aria-labelledby="bus-tab">
            <div className="row">
                <div className="col-lg-12">
                    <div className={`${layout === 'col' ? 'col justify-content-center mt-4' : 'row justify-content-center'}`}>
                        <div className={`${layout === 'col' ? "" : "col-lg-3 col-md-6 col-sm-12"} mb-3`}>
                            <div className="flight_Search_boxed">
                                <p>From</p>
                                <input
                                    type="text"
                                    value={sourceInput}
                                    onChange={handleSourceChange}
                                    placeholder="Type to search..."
                                />
                                {sourceSuggestions.length > 0 && (
                                    <ul className="suggestions-list"
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
                                        }}>
                                        {sourceSuggestions.map((suggestion) => (
                                            <li key={suggestion.id} onClick={() => handleSourceSuggestionClick(suggestion)}
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: '8px',
                                                    borderBottom: '1px solid #ddd'
                                                }}>
                                                {suggestion.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="plan_icon_posation">
                                    <i className="fas fa-bus"></i>
                                </div>
                            </div>
                        </div>
                        <div className={`${layout === 'col' ? "" : "col-lg-3 col-md-6 col-sm-12"} mb-3`}>
                            <div className="flight_Search_boxed">
                                <p>To</p>
                                <input
                                    type="text"
                                    value={destinationInput}
                                    onChange={handleDestinationChange}
                                    placeholder="Type to search..."
                                />
                                {destinationSuggestions.length > 0 && (
                                    <ul className="suggestions-list"
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
                                        }}>
                                        {destinationSuggestions.map((suggestion) => (
                                            <li key={suggestion.id} onClick={() => handleDestinationSuggestionClick(suggestion)}
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: '8px',
                                                    borderBottom: '1px solid #ddd'
                                                }}>
                                                {suggestion.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="plan_icon_posation">
                                    <i className="fas fa-bus"></i>
                                </div>
                                {layout == "col" ?
                                    <></> :
                                    <div className="range_plan">
                                        <i className="fas fa-exchange-alt"></i>
                                    </div>}
                            </div>
                        </div>
                        <div className={`${layout === 'col' ? "" : "col-lg-3 col-md-6 col-sm-12"} mb-3`}>
                            <div className="form_search_date">
                                <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                        <p>Journey date</p>
                                        <DatePicker
                                            selected={journeyDate}
                                            onChange={handleJourneyDateChange}
                                            dateFormat="MM/dd/yyyy"
                                            minDate={new Date()}
                                            placeholderText='mm/dd/yyyy'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top_form_search_button">
                            <button className="btn btn-primary" onClick={handleSearchClick}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bus;