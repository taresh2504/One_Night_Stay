import React from 'react';
import '../App.css';

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-box">
        <h1 className="services-heading">Our Services</h1>

        {/* <div className='service-card-holder'> */}

        <div className="service-card">
          <h3>🏨 Hotel Booking</h3>
          <p>Book luxury hotels, business hotels, and budget stays with ease.</p>
        </div>

        <div className="service-card">
          <h3>🌴 Resort Reservations</h3>
          <p>Explore and reserve premium resorts for vacations and getaways.</p>
        </div>

        <div className="service-card">
          <h3>🏡 Villa & Apartment Rentals</h3>
          <p>Find comfortable villas and apartments for short or long stays.</p>
        </div>

        <div className="service-card">
          <h3>💳 Secure Payments</h3>
          <p>Enjoy safe and secure online payment options.</p>
        </div>

        <div className="service-card">
          <h3>⭐ Verified Properties</h3>
          <p>Browse trusted and verified property listings.</p>
        </div>

        <div className="service-card">
          <h3>📞 24/7 Customer Support</h3>
          <p>Get assistance whenever you need help with bookings.</p>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default Services;