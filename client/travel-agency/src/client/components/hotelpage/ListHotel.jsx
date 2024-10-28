import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import NoHotel from './NoHotel';
import { Map } from 'lucide-react';
import { Button } from 'react-bootstrap';

const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const ListHotel = ({ isSearching, hotels }) => {
    const [isMapView, setIsMapView] = useState(false);
    const [displayedHotels, setDisplayedHotels] = useState([]);
    const [selectedStars, setSelectedStars] = useState([]);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Get unique star categories from hotels
    const starCategories = [...new Set(hotels.map(hotel => hotel.StarCategoryId))].sort();

    useEffect(() => {
        const filteredHotels = hotels.filter(hotel =>
            selectedStars.length === 0 || selectedStars.includes(hotel.StarCategoryId)
        );
        setDisplayedHotels(filteredHotels.slice(0, 20));
    }, [hotels, selectedStars]);

    const loadMoreHotels = () => {
        const filteredHotels = hotels.filter(hotel =>
            selectedStars.length === 0 || selectedStars.includes(hotel.StarCategoryId)
        );
        setDisplayedHotels((prev) => [
            ...prev,
            ...filteredHotels.slice(prev.length, prev.length + 20),
        ]);
    };

    const toggleStarFilter = (stars) => {
        setSelectedStars(prev =>
            prev.includes(stars)
                ? prev.filter(s => s !== stars)
                : [...prev, stars]
        );
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
        return <NoHotel />;
    }

    return (
        <div className="relative h-screen">
            <div className="d-flex justify-content-between px-4 p-2 border border-dark rounded-3">
                <div className="d-flex gap-4">
                    {starCategories.map(stars => (
                        <button
                            key={stars}
                            onClick={() => toggleStarFilter(stars)}
                            className={`text-xs px-1 border-none outline-none focus:outline-none focus:ring-0 ${selectedStars.includes(stars)
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-transparent hover:bg-gray-100'
                                }`}
                            style={{ border: 'none', boxShadow: 'none' }}
                        >
                            {stars}⭐
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setIsMapView(!isMapView)}
                    className="text-xs flex items-center bg-transparent hover:bg-gray-100 px-1 border-none outline-none focus:outline-none focus:ring-0"
                    style={{ border: 'none', boxShadow: 'none' }}
                >
                    <Map className="h-3 w-3 mr-1" />
                    {isMapView ? 'List' : 'Map'}
                </button>
            </div>


            {isMapView ? (
                <MapView
                    hotels={selectedStars.length === 0 ? hotels : hotels.filter(hotel => selectedStars.includes(hotel.StarCategoryId))}
                    onHotelClick={(hotel) =>
                        navigate('/hotel-details', { state: { hotel, searchKey: hotels.searchKey } })
                    }
                />
            ) : (
                <div
                    ref={containerRef}
                    style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}
                    className="p-3"
                >
                    <div className="space-y-4 hotel-list">
                        {displayedHotels.map((hotel) => (
                            <HotelCard
                                key={hotel.HotelId}
                                hotel={hotel}
                                onClick={() =>
                                    navigate('/hotel-details', { state: { hotel, searchKey: hotels.searchKey } })
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const MapView = ({ hotels, onHotelClick }) => {
    useEffect(() => {
        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${VITE_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = initMap;

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const initMap = () => {
        const bounds = new window.google.maps.LatLngBounds();
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
        });

        hotels.forEach((hotel) => {
            const position = {
                lat: parseFloat(hotel.Latitude),
                lng: parseFloat(hotel.Longitude),
            };

            const marker = new window.google.maps.Marker({
                position,
                map,
                title: hotel.HotelName,
            });

            bounds.extend(position);

            marker.addListener('click', () => {
                onHotelClick(hotel);
            });
        });

        map.fitBounds(bounds);
    };

    return (
        <div id="map" style={{ height: 'calc(100vh - 120px)', width: '100%' }} />
    );
};

const HotelCard = React.forwardRef(({ hotel, onClick }, ref) => {
    return (
        <div ref={ref} className="card shadow-sm m-2" style={{ cursor: 'pointer' }} onClick={onClick}>
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', width: "100%", backgroundColor: '#f8f9fa' }}>
                        {hotel.HotelImage ? (
                            <img src={hotel.HotelImage} alt={hotel.HotelName} style={{ height: '9rem', width: '11rem' }} className="img-fluid rounded-start" />
                        ) : (
                            <span className="text-muted">No Image</span>
                        )}
                    </div>
                </div>
                <div className="col-md-10">
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
