import React from 'react';
import logo from '/img/logo.png';
import { Link } from 'react-router-dom';

const ClientNavBar = () => {
    return (
        <>
            {/* Navbar Bar */}
            <div className="navbar-area">
                <div className="main-responsive-nav">
                    <div className="container">
                        <div className="main-responsive-menu">
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
                            <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">
                                            <strong> Home </strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/flights" className="nav-link">
                                            <strong>Flights</strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/mobile-recharge" className="nav-link">
                                            <strong>Mobile Recharge</strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/bus" className="nav-link">
                                            <strong>Bus</strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/contact" className="nav-link">
                                            <strong>Contact</strong>
                                        </Link>
                                    </li>
                                </ul>
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