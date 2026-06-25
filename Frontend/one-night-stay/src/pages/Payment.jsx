import React from 'react';
import '../App.css';

const Payment = () => {
  return (
    <div className="payment-container">

      <div className="payment-card">

        <h1>Payment Summary</h1>

        <div className="booking-summary">
          <h2>The Leela Palace</h2>
          <p>📍 New Delhi, India</p>

          <div className="summary-details">
            <p><strong>Check In:</strong> 15 Aug 2026</p>
            <p><strong>Check Out:</strong> 18 Aug 2026</p>
            <p><strong>Guests:</strong> 2</p>
            <p><strong>Nights:</strong> 3</p>
          </div>
        </div>

        <div className="amount-section">
          <h3>Total Amount</h3>
          <h2>₹75,000</h2>
        </div>

        <div className="payment-method">
          <h3>Payment Method</h3>

          <label>
            <input type="radio" name="payment" defaultChecked />
            Razorpay
          </label>
        </div>

        <button className="pay-btn">
          Pay with Razorpay
        </button>

      </div>

    </div>
  );
};

export default Payment;