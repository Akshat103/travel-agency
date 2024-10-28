import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ListBus from '../components/buspage/ListBus';
import Bus from '../components/homepage/trip-section/Bus';
import { useNavigate } from 'react-router-dom';

const BusSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [busData, setBusData] = useState([]);
  const { source, destination, journeyDate } = useSelector((state) => state.bus);
  const navigate = useNavigate();

  const handleSearch = useCallback(async () => {
    if (!source || !destination || !journeyDate) {
      return;
    }

    setIsSearching(true);
    const toastId = toast.info('Searching...', { autoClose: false });

    try {
      const response = await fetch("/api/busSearch", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source, destination, doj: journeyDate }),
      });

      const data = await response.json();

      if (response.status === 401) {
        navigate(data.redirect);
        toast.dismiss(toastId);
        toast.error(data.message);
        return;
      }

      setBusData(data);
      toast.dismiss(toastId);
      toast.success('Buses found successfully!');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Search failed. Please try again.');
      console.error('Error searching buses:', error);
    } finally {
      setIsSearching(false);
    }
  }, [source, destination, journeyDate]);

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row p-2">
        <div className="row">
          <div className="col-12 text-center">
            <h3
              className="fw-bold text-white p-4 rounded"
              style={{
                background: '#282a29',
                borderRadius: '10px',
                fontSize: '1.2rem'
              }}
            >
              Find and Book Your Next Bus Journey
            </h3>
          </div>
        </div>
          <div className="col-md-3" style={{ borderRadius: '20px' }}>
            <Bus layout="col" onSearch={handleSearch} />
          </div>
          <div className="col-md-9">
            <ListBus isSearching={isSearching} buses={busData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSearch;
