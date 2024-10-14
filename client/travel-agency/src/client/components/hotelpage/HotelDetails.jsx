import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBed, FaMapMarkedAlt, FaStar } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';

const HotelDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotel, searchKey } = location.state || {};
    const [extraData, setExtraData] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [displayedRecommendations, setDisplayedRecommendations] = useState([]);
    const [showPolicy, setShowPolicy] = useState({});
    const containerRef = useRef(null);

    const hotelSearchDetails = useSelector((state) => state.hotel.formData);
    useEffect(() => {
        const fetchHotelDetails = async () => {
            if (hotel) {
                try {
                    const response = await fetch('/api/hoteldetails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            hotelKey: hotel.HotelKey,
                            searchKey: searchKey
                        }),
                    });

                    const result = await response.json();
                    if (result.statuscode === "TXN" && result.msg === "SUCCESS") {
                        setExtraData(result.data);
                        setRecommendations(result.data.RatePlanRecommendations || []);
                    } else {
                        console.error("Error fetching hotel details:", result.msg);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            }
        };

        fetchHotelDetails();
    }, [hotel, searchKey]);

    useEffect(() => {
        setDisplayedRecommendations(recommendations.slice(0, 3));
    }, [recommendations]);

    const loadMoreRecommendations = () => {
        setDisplayedRecommendations((prev) => [
            ...prev,
            ...recommendations.slice(prev.length, prev.length + 3),
        ]);
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                loadMoreRecommendations();
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
    }, [displayedRecommendations, recommendations]);

    const togglePolicy = (index) => {
        setShowPolicy((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    if (!hotel) {
        return <div>Hotel not found</div>;
    }

    const facilities = Array.isArray(hotel.HotelFacilities) ? hotel.HotelFacilities : [];

    const handleBook = (hotelId, hotelKey, recommendationId, rateplanId) => {
        navigate('/book-hotel', {
            state: {
                hotelId,
                hotelKey,
                recommendationId,
                rateplanId,
                hotelSearchDetails,
                searchKey
            }
        });
    };
    return (
        <div className="container m-5">
            <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-4">
                <ArrowLeft size={18} className="me-2" /> Back to Hotels
            </button>
            <div className="card shadow-sm">
                {hotel.HotelImage ? (
                    <img src={hotel.HotelImage} alt={hotel.HotelName} className="card-img-top" />
                ) : (
                    <div className="placeholder-image" style={{ height: '200px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span>No Image Available</span>
                    </div>
                )}
                <div className="card-body">
                    <h3 className="card-title mb-4">
                        {hotel.HotelName} <span className="text-warning"><FaStar /> {hotel.StarCategoryId || 'N/A'}</span>
                    </h3>
                    <p><FaMapMarkedAlt className="me-2 text-primary" />{hotel.Address || 'N/A'}</p>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            {hotel.CheckInTime && (
                                <p><strong>Check-in:</strong> {hotel.CheckInTime}</p>
                            )}
                            {hotel.CheckOutTime && (
                                <p><strong>Check-out:</strong> {hotel.CheckOutTime}</p>
                            )}
                        </div>
                    </div>
                    {facilities.length > 0 && (
                        <>
                            <div className="row">
                                {facilities.map((facility, idx) => (
                                    <div key={idx} className="col-md-6 mb-2">
                                        <li className="d-flex align-items-center">
                                            <span className="me-2 text-success"><FaBed /></span>
                                            {typeof facility === 'object' && facility.FacilityName
                                                ? facility.FacilityName
                                                : facility || 'N/A'}
                                        </li>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <>
                        {displayedRecommendations.length > 0 && (
                            <>
                                <div ref={containerRef} style={{ height: '300px', overflowY: 'auto' }} className="recommendations-container">
                                    <div className="row">
                                        {displayedRecommendations.map((recHotel, index) => (
                                            <div key={index} className="hotel-card">
                                                {recHotel.RatePlanDetails.map((ratePlan, rpIndex) => (
                                                    <div key={rpIndex} className="rate-plan">
                                                        <div className='plan-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div className='plan-details'>
                                                                <div className="room-details">
                                                                    <span className="room-type">{ratePlan.RoomDetails[0].HotelRoomTypeDesc}</span>
                                                                </div>

                                                                <div className="price-details">
                                                                    <span className="label" style={{ fontStyle: "italic" }}>Total Price:</span>{' '}
                                                                    <span className="price">₹{Math.ceil(ratePlan.TotalAmount)}</span>
                                                                </div>

                                                                <div className="cancellation-policy" onClick={() => togglePolicy(`${index}-${rpIndex}`)}>
                                                                    <span style={{ color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>*</span>{' '}
                                                                    <span className="label">Cancellation Policy:</span>{' '}
                                                                    {showPolicy[`${index}-${rpIndex}`] && (
                                                                        <span className="policy-text">
                                                                            {ratePlan.CancellationPolicy.replace(/<br>/g, ' ')}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className='book-btn'>
                                                                <button type="button" class="btn btn-primary" onClick={()=>handleBook(hotel.HotelId, hotel.HotelKey, recHotel.RecommendationId, ratePlan.RateplanId)}>Book Now</button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                    {extraData && (
                        <>
                            <p>{extraData.AboutHotel}</p>
                            <p>{extraData.City}, {extraData.Country}</p>
                            <p>{extraData.Amenities.split(',').map((amenity, index) => (
                                <span key={index} className="badge bg-secondary me-1">{amenity.trim()}</span>
                            ))}</p>
                            <div id="hotelGalleryCarousel" className="carousel slide" data-bs-ride="carousel" height="10rem">
                                <div className="carousel-inner">
                                    {extraData.HotelGallery && extraData.HotelGallery.map((image, idx) => (
                                        <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                                            <img src={image.ImageURL} alt={image.ImageDesc} className="d-block w-100 img-fluid" />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#hotelGalleryCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#hotelGalleryCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
