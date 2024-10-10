import React, { useState } from 'react';
import Filter from '../components/flightpage/Filter';
import ListFlights from '../components/flightpage/ListFlights';
import { useDispatch } from 'react-redux';
import { searchFlights } from '../../redux/flightSlice';
import { toast } from 'react-toastify';

const FlightSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [flights, setFlights] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async (flightDetails) => {
    setIsSearching(true);

    const toastId = toast.info('Searching...', { autoClose: false });

    try {
      const result = await dispatch(searchFlights(flightDetails)).unwrap();
      setFlights(result);

      toast.dismiss(toastId);
      if (result) {
        toast.success('Flights found successfully!');
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Error searching flights. Please try again.');
      console.error('Error searching flights:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row p-2">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="fw-bold text-white px-1 py-1 rounded" style={{background:"#8c3eea"}}>
                Get Your Flights
              </h3>
            </div>
          </div>
          <div className="col-md-3" style={{ borderRadius: '20px' }}>
            <Filter onSearch={handleSearch} />
          </div>
          <div className="col-md-9">
            <ListFlights flights={flights} isSearching={isSearching} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSearch;
