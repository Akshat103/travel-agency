import React from 'react';
import ClientNavBar from './ClientNavBar';
import { Link } from 'react-router-dom';

const ClientHeader = () => {

    const userType = localStorage.getItem('userType');

    const renderAuthLinks = () => {
        if (userType === '1') {
          return null;
        } else if (userType === '0') {
          return (
            <li><Link to="dashboard">Dashboard</Link></li>
          );
        } else {
          return (
            <>
              <li><Link to="login">Login</Link></li>
              <li><Link to="register">Register</Link></li>
            </>
          );
        }
      };

  return (
    <>
    <header className="main_header_arae">
        <div className="topbar-area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <ul className="topbar-list">
                            <li>
                                <a href="#!"><i className="fab fa-facebook"></i></a>
                                <a href="#!"><i className="fab fa-twitter-square"></i></a>
                                <a href="#!"><i className="fab fa-instagram"></i></a>
                                <a href="#!"><i className="fab fa-linkedin"></i></a>
                            </li>
                            <li><a href="#!"><span>+91 8079 881 580</span></a></li>
                            <li><a href="#!"><span>yaraholiday46@gmail.com</span></a></li>
                        </ul>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <ul className="topbar-others-options">
                            {renderAuthLinks()}
                            <li>
                                <div className="dropdown language-option">
                                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="lang-name"></span>
                                    </button>
                                    <div className="dropdown-menu language-dropdown-menu">
                                        <a className="dropdown-item" href="#">English</a>
                                        <a className="dropdown-item" href="#">Arabic</a>
                                        <a className="dropdown-item" href="#">French</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown language-option">
                                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="lang-name"></span>
                                    </button>
                                    <div className="dropdown-menu language-dropdown-menu">
                                        <a className="dropdown-item" href="#">USD</a>
                                        <a className="dropdown-item" href="#">BD</a>
                                        <a className="dropdown-item" href="#">URO</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      <ClientNavBar />
    </header>
    </>
  )
}

export default ClientHeader;