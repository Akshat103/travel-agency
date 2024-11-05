import React from 'react';
import ClientNavBar from './ClientNavBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientHeader = () => {

  const userType = localStorage.getItem('userType');

  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      const response = await axios.post('/api/logout');
      const { message } = response.data;
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
          <li>
            <button className='btn btn-dark' onClick={() => navigate('/dashboard')}>
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={logout} className='btn btn-dark'>
              Log Out
            </button>
          </li>
        </>
      );
    } else if (userType === '0') {
      return (
        <>
          <li>
            <button className='btn btn-dark' onClick={() => navigate('/dashboard')}>
              Dashboard
            </button>
          </li>
          <li>
            <button className='btn btn-dark' onClick={() => navigate('/admin')}>
              Admin Panel
            </button>
          </li>
          <li>
            <button onClick={logout} className='btn btn-dark'>
              Log Out
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <button type="button" className="btn btn-dark" onClick={() => navigate('/login')}>
              Login
            </button>
          </li>
        </>
      );
    }
  };

  const isHomePage = location.pathname === '/';
  return (
    <>
      <header className="main_header_arae"
        style={{
          position: isHomePage ? 'absolute' : 'relative',
          background: !isHomePage ? '#0b184e' : ''
        }}
      >
        <div className="topbar-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-list">
                  <li>
                    <Link to="https://www.facebook.com/share/LQ9ntK2srZfMCkK3"><i className="fab fa-facebook"></i></Link>
                    <Link to="https://x.com/HolidayYar6652?t=YLmJRsRBSXREG3tgcqs8cg&s=09"><i className="fab fa-twitter-square"></i></Link>
                    <Link to="https://www.instagram.com/invites/contact/?igsh=vo8eehrww7z2&utm_content=vhahyr5"><i className="fab fa-instagram"></i></Link>
                    <Link to="https://youtube.com/@yaraholiday-ar7?si=u-ZidLykh2sWjsWA"><i className="fab fa-youtube"></i></Link>
                    <Link to="https://whatsapp.com/channel/0029Valo58lHrDZdW0JXwE11"><i className="fab fa-whatsapp"></i></Link>
                  </li>
                  <li><span>+91 8079 881 580</span></li>
                  <li><span><Link to="mailto:info@yaraholidays.com">info@yaraholidays.com</Link></span></li>
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
        <ClientNavBar userType={userType} onLogout={logout} />
      </header>
    </>
  )
}

export default ClientHeader;