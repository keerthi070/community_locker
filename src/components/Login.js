// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ mobileOrName: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 🔐 Store userId for dashboard access
        localStorage.setItem('userId', data.user._id);
        navigate('/Dboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Server error while logging in');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Community Login</h2>
        <p className="subtitle">Access your Smart Parcel Locker</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Community name or Mobile Number</label>
            <input
              type="text"
              name="mobileOrName"
              value={formData.mobileOrName}
              onChange={handleChange}
              placeholder="Enter community name or mobile number"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button className="login-btn" type="submit">Login</button>
        </form>

        <div className="register-link">
          Don’t have an account? <a href="/register">Register here</a>
        </div>

        <div className="footer">© 2025 Smart Parcel Locker System</div>
      </div>
    </div>
  );
};

export default Login;
