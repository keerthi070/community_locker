import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>How Our Smart Locker System Helps</h2>
      <p className="about-intro">
        Our Community Locker System provides a secure, convenient way to send, receive, and manage packages 
        without missing deliveries. Enjoy real-time tracking, notifications, and 24/7 access.
      </p>

      <div className="about-steps">

        <div className="about-step">
          <div className="about-icon">
            📦
          </div>
          <div className="about-content">
            <h3>Secure Storage</h3>
            <p>Packages are safely stored in electronically locked compartments until picked up by the recipient.</p>
          </div>
        </div>

        <div className="about-step">
          <div className="about-icon">
            🔑
          </div>
          <div className="about-content">
            <h3>Convenient Access</h3>
            <p>Recipients can collect packages anytime using a unique PIN code, avoiding missed deliveries.</p>
          </div>
        </div>

        <div className="about-step">
          <div className="about-icon">
          🚚
          </div>
          <div className="about-content">
            <h3>Package Collection</h3>
            <p>The recipient visits the locker location and enters their PIN to unlock and collect their package.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
