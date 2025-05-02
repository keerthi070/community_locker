import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    admin: '',
    mobile: '',
    lockerBoxes: 1,
    lockersPerBox: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/register', formData)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Register a Community / Hostel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Community/Hostel Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="admin"
          placeholder="Admin/Watchman Name"
          value={formData.admin}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <select
          name="lockerBoxes"
          value={formData.lockerBoxes}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map(number => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
        <select
          name="lockersPerBox"
          value={formData.lockersPerBox}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map(number => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
