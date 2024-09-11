import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ListFlights = ({ flights, isSearching }) => {

    console.log(flights)
  if (isSearching) {
    return (
      <div className="p-3">
        <h4>Flights</h4>
        <Skeleton count={5} height={50} />
      </div>
    );
  }

//   if (flights.length === 0) {
//     return (
//       <div className="p-3">
//         <h4>Flights</h4>
//         <p>No flights found.</p>
//       </div>
//     );
//   }

  return (
    <div className="p-3">
      <h4>Flights</h4>
      {/* Render flight details here
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>{flight.details}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default ListFlights;
