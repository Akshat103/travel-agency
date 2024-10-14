import React, { useState } from 'react';
import logo from '/img/logo.png';
import { Link } from 'react-router-dom';

const ClientNavBar = () => {

    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <>
            {/* Navbar Bar */}
            <div className="navbar-area">
                <div className="main-responsive-nav">
                    <div className="container">
                        <div className="main-responsive-menu mean-container">
                            <div className="mean-bar">
                                <Link
                                    className="meanmenu-reveal"
                                    style={{ right: '0px', left: 'auto', textAlign: 'center', textIndent: '0px', fontSize: '18px' }}
                                    onClick={toggleNav}
                                >
                                    <span><span><span></span></span></span>
                                </Link>
                                <nav className="mean-nav">
                                    <ul className="navbar-nav" style={{ display: isNavVisible ? 'block' : 'none' }}>
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link">Home <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/flights" className="nav-link">Flights <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/mobile-recharge" className="nav-link">Recharge <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/hotel" className="nav-link">Hotel <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/bus" className="nav-link">Bus <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/contact-us" className="nav-link">Contact <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/about-us" className="nav-link">About Us<i className="fas fa-angle-down"></i></Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="logo">
                                <Link to="/">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-navbar">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <Link className="navbar-brand" to="/">
                                <img src={logo} alt="logo" />
                            </Link>
                            <div className="mean-push"></div>
                            <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent" style={{ display: "none" }}>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/flights" className="nav-link">
                                            Flights
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/mobile-recharge" className="nav-link">
                                            Recharge
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/hotel" classNameName="nav-link">
                                            Hotel
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/bus" classNameName="nav-link">
                                            Bus
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/contact-us" classNameName="nav-link">
                                            Contact
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/about-us" classNameName="nav-link">
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientNavBar;