import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

const ClientFooter = () => {
  return (
    <>
      {/* Footer */}
      <footer id="footer_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Need any help?</h5>
              </div>
              <div className="footer_first_area">
                <div className="footer_inquery_area">
                  <h5>Call 24/7 for any help</h5>
                  <h3> <Link to="tel:+91-8079-881-580">+91 8079 881 580</Link></h3>
                </div>
                <div className="footer_inquery_area">
                  <h5>Mail to our support team</h5>
                  <h3> <Link to="mailto:yaraholiday46@gmail.com">yaraholiday46@gmail.com</Link></h3>
                </div>
                <div className="footer_inquery_area">
                  <h5>Follow us on</h5>
                  <ul className="soical_icon_footer">
                    <li><Link to="#!"><i className="fab fa-facebook"></i></Link></li>
                    <li><Link to="#!"><i className="fab fa-twitter-square"></i></Link></li>
                    <li><Link to="#!"><i className="fab fa-instagram"></i></Link></li>
                    <li><Link to="#!"><i className="fab fa-linkedin"></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Company</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li><Link to="/about-us">About Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Support</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li><Link to="/contact-us">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Our Services</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li><Link to="/flights">Flight</Link></li>
                  <li><Link to="/mobile-recharge">Recharge</Link></li>
                  <li><Link to="/hotel">Hotel</Link></li>
                  <li><Link to="/bus">Bus</Link></li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </footer>
      <div className="copyright_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_left">
                <p>Copyright Yara Holidays © 2024 All Rights Reserved</p>
              </div>
            </div>
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_right">
                <img src={logo} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientFooter;