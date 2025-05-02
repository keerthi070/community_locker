import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to the Smart Parcel Locker System</h1>
        <p>A secure and convenient way to send and receive packages without waiting or missing deliveries.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">Delivery Personnel Login →</Link>
          <Link to="/register" className="btn-secondary">Recipient Access →</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Secure Delivery</h3>
          <p>Packages are safely stored in electronically locked compartments until pickup.</p>
        </div>
        <div className="feature-card">
          <h3>Convenient Pickup</h3>
          <p>Recipients can collect packages at any time using a unique PIN code.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Tracking</h3>
          <p>Automatic notifications when a package is delivered and ready for collection.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
