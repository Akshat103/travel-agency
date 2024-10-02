import React from 'react';
import ClientNavBar from './ClientNavBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientHeader = () => {

  const userType = localStorage.getItem('userType');

  const navigate = useNavigate();
  const location = useLocation();

  const logout = async() =>{
    try {
      const response = await axios.post('/api/logout');
      const { message } = response.data;
      console.log('Logout successful:', message); 
      localStorage.clear(); 
      navigate('/');
      toast.success(message);
    } catch (error) {
      toast.error('Log Out failed. Please check your credentials.');
    }
  }

  const renderAuthLinks = () => {
    if (userType === '1') {
      return (
        <>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><button onClick={logout} className='btn btn-dark'>
            Log Out
          </button></li>
        </>
      );
    } else if (userType === '0') {
      return (
        <>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><button onClick={logout} className='btn btn-dark'>
            Log Out
          </button></li>
        </>
      );
    } else {
      return (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      );
    }
  };

  const isHomePage = location.pathname === '/';
  return (
    <>
      <header className="main_header_arae"
      style={{
        position: isHomePage? 'absolute': 'relative',
        background: !isHomePage? 'blueviolet': ''
      }}
      >
        <div className="topbar-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-list">
                  <li>
                    <Link to="#!"><i className="fab fa-facebook"></i></Link>
                    <Link to="#!"><i className="fab fa-twitter-square"></i></Link>
                    <Link to="#!"><i className="fab fa-instagram"></i></Link>
                    <Link to="#!"><i className="fab fa-linkedin"></i></Link>
                  </li>
                  <li><Link to="#!"><span>+91 8079 881 580</span></Link></li>
                  <li><Link to="#!"><span>yaraholiday46@gmail.com</span></Link></li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-others-options">
                  {renderAuthLinks()}
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