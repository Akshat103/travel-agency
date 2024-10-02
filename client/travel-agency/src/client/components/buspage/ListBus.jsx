import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { ChevronRight } from 'lucide-react';

const ListBus = ({ isSearching, buses, loadMoreBuses }) => {
  const observer = useRef();
  const navigate = useNavigate();

  const lastBusElementRef = (node) => {
    if (isSearching) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreBuses();
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    const loadMoreOnScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 50) {
        loadMoreBuses();
      }
    };

    window.addEventListener('scroll', loadMoreOnScroll);
    return () => window.removeEventListener('scroll', loadMoreOnScroll);
  }, [loadMoreBuses]);

  if (isSearching) {
    return (
      <div className="p-3">
        <h4>Buses</h4>
        <Skeleton count={3} height={150} />
      </div>
    );
  }

  if (!buses.length) {
    return (
      <div className="p-3">
        <h4>Buses</h4>
        <p>No buses found.</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h4>Buses</h4>
      <div className="space-y-4">
        {buses.map((bus, index) => {
          const isLastBus = index === buses.length - 1;
          return (
            <BusCard
              key={bus.id}
              bus={bus}
              ref={isLastBus ? lastBusElementRef : null}
              onClick={() => navigate('/bus-details', { state: { bus } })}
            />
          );
        })}
      </div>
    </div>
  );
};

const BusCard = React.forwardRef(({ bus, onClick }, ref) => {
  return (
    <div ref={ref} className="card shadow-sm m-2 cursor-pointer" onClick={onClick}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">{bus.travels}</h5>
          <ChevronRight size={20} />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="d-flex">
            <div className="me-4">
              <p className="font-semibold">Departure</p>
              <p>{bus.Departure_Time}</p>
            </div>
            <div className="ms-4">
              <p className="font-semibold">Arrival</p>
              <p>{bus.Arrival_Time}</p>
            </div>
          </div>
          <div className="d-flex">
            <p className="font-semibold me-4">Available Seats</p>
            <p>{bus.availableSeats}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ListBus;