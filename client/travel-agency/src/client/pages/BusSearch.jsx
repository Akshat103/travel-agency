import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Banner from '../components/Banner';
import ListBus from '../components/buspage/ListBus';
import Bus from '../components/homepage/trip-section/Bus';

const BusSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [busData, setBusData] = useState([]);
  const { source, destination, journeyDate } = useSelector((state) => state.bus);

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
        body: JSON.stringify({ source, destination, doj:journeyDate }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
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
      <Banner
        title="Buses"
        breadcrumbs={[
          { text: 'Home', link: '/' },
          { text: 'Buses' },
        ]}
      />
      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-md-3 bg-light" style={{ borderRadius: '20px' }}>
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
