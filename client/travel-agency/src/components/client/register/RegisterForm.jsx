import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import google from '../../../assets/img/icon/google.png';
import facebook from '../../../assets/img/icon/facebook.png';
import twitter from '../../../assets/img/icon/twitter.png';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    userType: 1,
    mobileNumber: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    state: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber' && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error('Mobile number must be exactly 10 digits.');
      return;
    }

    try {
      await axios.post('/api/register', formData);
      toast.success('Successful! You can login now');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <section id="common_author_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="common_author_boxed">
              <div className="common_author_heading">
                <h3>Register account</h3>
                <h2>Register your account</h2>
              </div>
              <div className="common_author_form">
                <form id="main_author_form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name*"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => setFormData(prev => ({
                        ...prev,
                        name: prev.name.replace(/\b\w/g, char => char.toUpperCase()) // Convert to Sentence Case
                      }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mobile number*"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select gender*</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date of Birth*"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State*"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={() => setFormData(prev => ({
                        ...prev,
                        state: prev.state.replace(/\b\w/g, char => char.toUpperCase()) // Convert to Sentence Case
                      }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password*"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="common_form_submit">
                    <button className="btn btn_theme btn_md" type="submit">
                      Register
                    </button>
                  </div>
                  <div className="have_acount_area other_author_option">
                    <div className="line_or">
                      <span>or</span>
                    </div>
                    <ul>
                      <li>
                        <a href="#!">
                          <img src={google} alt="Google icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src={facebook} alt="Facebook icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src={twitter} alt="Twitter icon" />
                        </a>
                      </li>
                    </ul>
                    <p>
                      Already have an account? <Link to="/login">Log in now</Link>
                    </p>
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

export default RegisterForm;
