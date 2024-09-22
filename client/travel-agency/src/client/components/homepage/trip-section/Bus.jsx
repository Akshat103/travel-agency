import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSource, setDestination, setJourneyDate, setSourceList, setDestinationList } from '../../../../redux/busSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    const handleSourceChange = (e) => {
        const value = e.target.value;
        setSourceInput(value);
        if (value.length >= 2) {
            debouncedFetchSourceList();
            setSourceSuggestions(filterSources(value));
        } else {
            setSourceSuggestions([]);
        }
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
        setDestinationSuggestions([]);
    };

    const handleSourceSuggestionClick = (suggestion) => {
        setSourceInput(suggestion.name);
        dispatch(setSource(suggestion.id));
        setSourceSuggestions([]);
        fetchDestinationList(suggestion.id);
        setDestinationInput('');
        setDestinationSuggestions([]);
    };

    const handleJourneyDateChange = (e) => {
        dispatch(setJourneyDate(e.target.value));
    };

    const handleSearchClick = () => {
        if (layout === "col") {
            onSearch();
        } else {
            navigate('/bus-details');
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
                <div className="col-lg-10">
                    <div className="tour_search_form">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="oneway_search_form">
                                    <div className={`${layout === 'col' ? 'col justify-content-center' : 'row justify-content-center'}`}>
                                        <div className={`${layout === 'col' ? "" : "col-lg-3 col-md-6 col-sm-12 mb-3"}`}>
                                            <div className="flight_Search_boxed">
                                                <p>From</p>
                                                <input
                                                    type="text"
                                                    value={sourceInput}
                                                    onChange={handleSourceChange}
                                                    placeholder="Type to search..."
                                                    className="form-control"
                                                />
                                                {sourceSuggestions.length > 0 && (
                                                    <ul className="suggestions-list" style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                                        {sourceSuggestions.map((suggestion) => (
                                                            <li key={suggestion.id} onClick={() => handleSourceSuggestionClick(suggestion)} style={{ cursor: 'pointer' }}>
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
                                        <div className={`${layout === 'col' ? "" : "col-lg-3 col-md-6 col-sm-12 mb-3"}`}>
                                            <div className="flight_Search_boxed">
                                                <p>To</p>
                                                <input
                                                    type="text"
                                                    value={destinationInput}
                                                    onChange={handleDestinationChange}
                                                    placeholder="Type to search..."
                                                    className="form-control"
                                                />
                                                {destinationSuggestions.length > 0 && (
                                                    <ul className="suggestions-list" style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                                        {destinationSuggestions.map((suggestion) => (
                                                            <li key={suggestion.id} onClick={() => handleDestinationSuggestionClick(suggestion)} style={{ cursor: 'pointer' }}>
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
                                        <div className={`${layout === 'col' ? "" : "col-lg-3 col-md-6 col-sm-12 mb-3"}`}>
                                            <div className="form_search_date">
                                                <div className="flight_Search_boxed date_flex_area">
                                                    <div className="Journey_date">
                                                        <p>Journey date</p>
                                                        <input
                                                            type="date"
                                                            value={journeyDate}
                                                            onChange={handleJourneyDateChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="top_form_search_button">
                                            <button className="btn btn_theme btn_md" onClick={handleSearchClick}>
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bus;