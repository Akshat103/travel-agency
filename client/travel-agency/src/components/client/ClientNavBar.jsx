import React from 'react';
import logo from '../../assets/img/logo.png';

const ClientNavBar = () => {
    return (
        <>
            {/* Navbar Bar */}
            <div className="navbar-area">
                <div className="main-responsive-nav">
                    <div className="container">
                        <div className="main-responsive-menu">
                            <div className="logo">
                                <a href="index.html">
                                    <img src={logo} alt="logo" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-navbar">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <a className="navbar-brand" href="index.html">
                                <img src={logo} alt="logo" />
                            </a>
                            <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link active">
                                            Home
                                            <i className="fas fa-angle-down"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            Categories
                                            <i className="fas fa-angle-down"></i>
                                        </a>
                                        <ul className="dropdown-menu">

                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    Flights
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <a href="flight-search-result.html" className="nav-link">Flight</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="flight-booking-submission.html" className="nav-link">Flight Booking</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    Hotel
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <a href="hotel-search.html" className="nav-link">Hotel Grid</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="hotel-search-list.html" className="nav-link">Hotel List</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="hotel-map.html" className="nav-link">Hotel Map</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="hotel-details.html" className="nav-link">Hotel Booking</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="room-details.html" className="nav-link">Room Details</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="room-booking.html" className="nav-link">Room Booking</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    Bus
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <a href="bus-search-list.html" className="nav-link">Bus</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="bus-search-map.html" className="nav-link">Bus Map</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="bus-booking.html" className="nav-link">Bus Booking</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    Train
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <a href="cruise-search-list.html" className="nav-link">Train</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="cruise-map.html" className="nav-link">Train Map</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="cruise-details.html" className="nav-link">Train Details</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="cruise-booking.html" className="nav-link">Train Booking</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <a href="#" className="nav-link">Dashboard  <i className="fas fa-angle-down"></i></a>

                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <a href="dashboard.html" className="nav-link">Recharge</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="hotel-booking.html" className="nav-link">DTH</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="flight-booking.html" className="nav-link">Postpaid</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="tour-booking.html" className="nav-link">Insurance</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="tour-booking.html" className="nav-link">Broadband</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="booking-history.html" className="nav-link">LANDLINE</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="my-profile.html" className="nav-link">ELECTRICITY BILL</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="wallet.html" className="nav-link">GAS </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="notification.html" className="nav-link">BILL</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="notification.html" className="nav-link">Water Bill</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">Contact <i className="fas fa-angle-down"></i></a>
                                        <ul className="dropdown-menu">

                                            <li className="nav-item">
                                                <a href="contact-v2.html" className="nav-link">Contact v2</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className="others-options d-flex align-items-center">
                                    <div className="option-item">
                                        <a href="#" className="search-box">
                                            <i className="bi bi-search"></i>
                                        </a>
                                    </div>
                                    <div className="option-item">
                                        <a href="become-vendor.html" className="btn  btn_navber">Become a partner</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="others-option-for-responsive">
                    <div className="container">
                        <div className="dot-menu">
                            <div className="inner">
                                <div className="circle circle-one"></div>
                                <div className="circle circle-two"></div>
                                <div className="circle circle-three"></div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="option-inner">
                                <div className="others-options d-flex align-items-center">
                                    <div className="option-item">
                                        <a href="#" className="search-box"><i className="fas fa-search"></i></a>
                                    </div>
                                    <div className="option-item">
                                        <a href="contact.html" className="btn  btn_navber">Get free quote</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientNavBar;