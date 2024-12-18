import React, { useState } from 'react';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { BiHomeAlt2 } from "react-icons/bi";
import { TbPlaneInflight } from "react-icons/tb";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { IoBusOutline } from "react-icons/io5";
import { LuHotel } from "react-icons/lu";

const ClientNavBar = ({ userType, onLogout }) => {

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
                                            <Link to="/" className="nav-link"><BiHomeAlt2 /> Home <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/flights" className="nav-link"><TbPlaneInflight /> Flights <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/mobile-recharge" className="nav-link"><HiMiniDevicePhoneMobile /> Recharge <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/hotel" className="nav-link"><LuHotel /> Hotel <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/bus" className="nav-link"><IoBusOutline /> Bus <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/contact-us" className="nav-link">Contact <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/about-us" className="nav-link">About Us <i className="fas fa-angle-down"></i></Link>
                                        </li>
                                        {userType === '1' && (
                                            <>
                                                <li className="nav-item">
                                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/" className="nav-link" onClick={onLogout}>Log Out</Link>
                                                </li>
                                            </>
                                        )}
                                        {userType === '0' && (
                                            <>
                                                <li className="nav-item">
                                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/admin" className="nav-link">Admin Panel</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/" className="nav-link" onClick={onLogout}>Log Out</Link>
                                                </li>
                                            </>
                                        )}
                                        {!userType && (
                                            <li className="nav-item">
                                                <Link to="/login" className="nav-link">Login</Link>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                            <div className="logo">
                                <Link to="/">
                                    <img src={logo} alt="logo" style={{ height: '3rem' }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-navbar" style={{ background: '#272a29' }}>
                    <div className="container">
                        <nav className="navbar navbar-expand-md">
                            <Link className="navbar-brand" to="/">
                                <img src={logo} alt="logo"  style={{height:'3rem'}}/>
                            </Link>
                            <div className="mean-push"></div>
                            <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent" style={{ display: "none" }}>
                                <ul className="navbar-nav" style={{ scrollbarWidth: "none" }}>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">
                                            <BiHomeAlt2 /> Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/flights" className="nav-link">
                                            <TbPlaneInflight /> Flights
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/mobile-recharge" className="nav-link">
                                            <HiMiniDevicePhoneMobile /> Recharge
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/hotel" className="nav-link">
                                            <LuHotel /> Hotel
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/bus" className="nav-link">
                                            <IoBusOutline /> Bus
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/contact-us" className="nav-link">
                                            Contact
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/about-us" className="nav-link">
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