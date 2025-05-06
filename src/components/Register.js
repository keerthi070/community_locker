// Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    communityName: '',
    adminName: '',
    address: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    boxCount: '1',
    lockersPerBox: '1',
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.communityName,
          adminName: formData.adminName,
          address: formData.address,
          mobile: formData.mobile,
          password: formData.password,
          boxCount: Number(formData.boxCount),
          lockersPerBox: Number(formData.lockersPerBox),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store registration details in localStorage
        localStorage.setItem('communityName', formData.communityName);
        localStorage.setItem('adminName', formData.adminName);
        localStorage.setItem('boxCount', formData.boxCount);
        localStorage.setItem('lockersPerBox', formData.lockersPerBox);

        // Redirect to login page after successful registration
        navigate('/login'); // Redirect to login page after registration
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      alert('Error connecting to server.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Community Registration</h2>
        <p className="subtitle">Set up your Smart Parcel Locker for your community or hostel</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Community/Hostel Name</label>
              <input
                type="text"
                name="communityName"
                value={formData.communityName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Admin/Watchman Full Name</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
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
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Number of Locker Boxes</label>
              <select
                name="boxCount"
                value={formData.boxCount}
                onChange={handleChange}
              >
                {[...Array(30)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Lockers in Each Box</label>
              <select
                name="lockersPerBox"
                value={formData.lockersPerBox}
                onChange={handleChange}
              >
                {[...Array(30)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              I agree to the{' '}
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button type="submit" className="register-btn">Complete Registration</button>

          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
          <p className="footer">© 2025 Smart Parcel Locker System</p>
        </form>
      </div>
    </div>
  );
}

export default Register;
