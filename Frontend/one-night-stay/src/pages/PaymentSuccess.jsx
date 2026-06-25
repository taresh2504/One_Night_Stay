import React from 'react';
import '../App.css';

const PaymentSuccess = () => {
  return (
    <div className="success-container">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>Payment Successful</h1>

        <p className="success-message">
          Your payment has been completed successfully and your booking has been confirmed.
        </p>

        <div className="booking-info">

          <div className="info-row">
            <span>Property</span>
            <span>The Leela Palace</span>
          </div>

          <div className="info-row">
            <span>Booking ID</span>
            <span>BK-105</span>
          </div>

          <div className="info-row">
            <span>Payment ID</span>
            <span>pay_QWERTY123</span>
          </div>

          <div className="info-row">
            <span>Amount Paid</span>
            <span>₹75,000</span>
          </div>

          <div className="info-row">
            <span>Status</span>
            <span className="confirmed">
              Confirmed
            </span>
          </div>

        </div>

        <div className="success-buttons">

          <button className="booking-btn">
            View My Bookings
          </button>

          <button className="home-btn">
            Back To Home
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;