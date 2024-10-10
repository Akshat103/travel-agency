import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const ListHotel = ({ isSearching, hotels }) => {
    const [displayedHotels, setDisplayedHotels] = useState([]);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setDisplayedHotels(hotels.slice(0, 20));
    }, [hotels]);

    const loadMoreHotels = () => {
        setDisplayedHotels((prev) => [
            ...prev,
            ...hotels.slice(prev.length, prev.length + 20),
        ]);
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                loadMoreHotels();
            }
        };

        const ref = containerRef.current;
        if (ref) {
            ref.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (ref) {
                ref.removeEventListener('scroll', handleScroll);
            }
        };
    }, [displayedHotels, hotels]);

    if (isSearching) {
        return (
            <div className="p-3">
                <Skeleton count={4} height={150} />
            </div>
        );
    }

    if (!displayedHotels.length) {
        return (
            <div className="p-3">
                <h4>Hotels</h4>
                <p>No hotels found.</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}
            className="p-3"
        >
            <div className="space-y-4 hotel-list">
                {displayedHotels.map((hotel, index) => {
                    return (
                        <HotelCard
                            key={hotel.HotelId}
                            hotel={hotel}
                            onClick={() => navigate('/hotel-details', { state: { hotel, searchKey:hotels.searchKey } })}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const HotelCard = React.forwardRef(({ hotel, onClick }, ref) => {
    return (
        <div ref={ref} className="card shadow-sm m-2" style={{ cursor: 'pointer' }} onClick={onClick}>
            <div className="row g-0">
                <div className="col-md-4">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', width: "100%", backgroundColor: '#f8f9fa' }}>
                        {hotel.HotelImage ? (
                            <img src={hotel.HotelImage} alt={hotel.HotelName} className="img-fluid rounded-start" />
                        ) : (
                            <span className="text-muted">No Image</span>
                        )}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{hotel.HotelName}</h5>
                        <p className="card-text">{hotel.Address}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-primary">{hotel.StarCategoryId} Star</span>
                            <span className="text-success">₹{Math.ceil(hotel.fareDetails.TotalAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ListHotel;
