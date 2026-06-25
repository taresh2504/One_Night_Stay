import React from 'react'

const Booking = () => {
  return (
    <>
      <div className="booking-container">
  <div className="booking-card">

    <h1>Booking Page</h1>

    <h2>The Leela Palace</h2>
    <p>📍 New Delhi, India</p>
    <h3>₹25,000 / Night</h3>

    <form>
      <label>Check In Date</label>
      <input type="date" />

      <label>Check Out Date</label>
      <input type="date" />

      <label>Guests</label>
      <input type="number" min="1" />

      <div className="total-price">
        <h2>Total Price: ₹75,000</h2>
      </div>

      <button className="confirm-btn">
        Confirm Booking
      </button>
    </form>

  </div>
</div>
    </>
  )
}

export default Booking
