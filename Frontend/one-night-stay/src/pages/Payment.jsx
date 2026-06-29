import React from "react";
import "../App.css";

const Payment = () => {

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-6 col-md-8">

          <div className="payment-card shadow-lg">

            <h1 className="text-center mb-4">
              Payment Summary
            </h1>

            <div className="booking-summary">

              <h2>
                The Leela Palace
              </h2>

              <p>
                📍 New Delhi, India
              </p>

              <div className="row mt-3">

                <div className="col-6">
                  <p><strong>Check In:</strong></p>
                </div>

                <div className="col-6 text-end">
                  <p>15 Aug 2026</p>
                </div>

                <div className="col-6">
                  <p><strong>Check Out:</strong></p>
                </div>

                <div className="col-6 text-end">
                  <p>18 Aug 2026</p>
                </div>

                <div className="col-6">
                  <p><strong>Guests:</strong></p>
                </div>

                <div className="col-6 text-end">
                  <p>2</p>
                </div>

                <div className="col-6">
                  <p><strong>Nights:</strong></p>
                </div>

                <div className="col-6 text-end">
                  <p>3</p>
                </div>

              </div>

            </div>

            <hr />

            <div className="amount-section text-center">

              <h4>Total Amount</h4>

              <h2 className="text-primary">
                ₹75,000
              </h2>

            </div>

            <hr />

            <div className="payment-method">

              <h5 className="mb-3">
                Payment Method
              </h5>

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="radio"
                  checked
                  readOnly
                />

                <label className="form-check-label">
                  Razorpay
                </label>

              </div>

            </div>

            <button className="btn btn-primary w-100 mt-4 py-2">

              Pay with Razorpay

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Payment;