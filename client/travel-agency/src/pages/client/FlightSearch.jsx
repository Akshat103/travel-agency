import React, { useState } from 'react';
import Banner from '../../components/client/Banner';
import Filter from '../../components/client/flightpage/Filter';
import ListFlights from '../../components/client/flightpage/ListFlights';
import { useFlight } from '../../hooks/useFlight';

const FlightSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [flights, setFlights] = useState([]);
  const { handleSearch } = useFlight();

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
            <ListFlights />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSearch;