import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      const { userType } = response.data;
      localStorage.setItem('userType', userType); 
      navigate('/');
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <section id="common_author_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="common_author_boxed">
              <div className="common_author_heading">
                <h3>Login to your account</h3>
              </div>
              <div className="common_author_form">
                <form id="main_author_form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mobile number or email"
                      name="emailOrMobile"
                      value={formData.emailOrMobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
                  </div>
                  <div className="common_form_submit">
                    <button className="btn btn_theme btn_md" type="submit">Log in</button>
                  </div>
                  <div className="have_acount_area">
                    <p>Don't have an account? <Link to="/register">Register now</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogInForm;
