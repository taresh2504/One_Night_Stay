import React from 'react';
import '../App.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1 className="contact-heading">Contact Us</h1>

        <div className="contact-info">
          <h3>📧 Email</h3>
          <p>taresh430@gmail.com</p>

          <h3>📞 Phone</h3>
          <p>+91 7400962298</p>

          <h3>📍 Address</h3>
          <p>Bhopal, Madhya Pradesh, India</p>

          <h3>🕒 Business Hours</h3>
          <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
          <p>Sunday: Closed</p>

          <h3>🌐 Follow Us</h3>

          <div className="social-links">
            <p>
              <FaFacebook className="social-icon" />
              @One_Night_Stay
            </p>

            <p>
              <FaInstagram className="social-icon" />
              @One_Night_Stay
            </p>

            <p>
              <FaXTwitter className="social-icon" />
              @One_Night_Stay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;