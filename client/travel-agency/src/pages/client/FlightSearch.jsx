import React, { useState } from 'react';
import Banner from '../../components/client/Banner';
import Filter from '../../components/client/flightpage/Filter';
import ListFlights from '../../components/client/flightpage/ListFlights';
import { useDispatch } from 'react-redux';
import { searchFlights } from '../../redux/flightSlice';

const FlightSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [flights, setFlights] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async (flightDetails) => {
    setIsSearching(true);
    try {
      const result = await dispatch(searchFlights(flightDetails)).unwrap();
      setFlights(result);
    } catch (error) {
      console.error('Error searching flights:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <Banner
        title="Flights"
        breadcrumbs={[
          { text: 'Home', link: '/' },
          { text: 'Flights' },
        ]}
      />
      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-md-3 bg-light" style={{ borderRadius: '20px' }}>
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
