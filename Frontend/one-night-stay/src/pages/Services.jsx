import React from "react";
import "../App.css";

const Services = () => {
  return (
    <div className="container-fluid services-container py-5">

      <div className="container">

        <div className="text-center mb-5">

          <h1 className="services-heading">
            Our Services
          </h1>

        </div>

        <div className="row g-4">

          <div className="col-lg-4 col-md-6 col-12">
            <div className="service-card h-100 shadow-sm">
              <h3>🏨 Hotel Booking</h3>
              <p>
                Book luxury hotels, business hotels, and budget stays with ease.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="service-card h-100 shadow-sm">
              <h3>🌴 Resort Reservations</h3>
              <p>
                Explore and reserve premium resorts for vacations and getaways.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="service-card h-100 shadow-sm">
              <h3>🏡 Villa & Apartment Rentals</h3>
              <p>
                Find comfortable villas and apartments for short or long stays.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="service-card h-100 shadow-sm">
              <h3>💳 Secure Payments</h3>
              <p>
                Enjoy safe and secure online payment options.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="service-card h-100 shadow-sm">
              <h3>⭐ Verified Properties</h3>
              <p>
                Browse trusted and verified property listings.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="service-card h-100 shadow-sm">
              <h3>📞 24/7 Customer Support</h3>
              <p>
                Get assistance whenever you need help with bookings.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Services;