import React from 'react'
import '../App.css'
import logo from '../assets/One_Night_Stay_Logo.jpg'

const Propertydetails = () => {
  return (
    <>
      <div className="details-container">

  <div className="image-gallery">
    <img src={logo} className="main-image" />

    <div className="gallery-row">
      <img src={logo} />
      <img src={logo} />
      <img src={logo} />
      <img src={logo} />
    </div>
  </div>

  <div className="property-info">
    <h1>The Leela Palace</h1>

    <h3>📍 New Delhi, India</h3>

    <h2>₹25,000 / Night</h2>

    <p>
      Experience luxury and comfort at
      The Leela Palace with world-class
      amenities and exceptional hospitality.
    </p>
  </div>

  <div className="amenities">
    <h2>Facilities</h2>

    <div className="facility-list">
      <p>📶 Free WiFi</p>
      <p>📺 Smart TV</p>
      <p>🚗 Parking</p>
      <p>❄️ Air Conditioning</p>
      <p>🏊 Swimming Pool</p>
      <p>🍽 Restaurant</p>
    </div>
  </div>

  <div className="property-meta">
    <h2>Property Information</h2>

    <p>Bedrooms : 4</p>
    <p>Bathrooms : 3</p>
    <p>Beds : 5</p>
    <p>Guests : 8</p>
  </div>

  <div className="action-buttons">
    <button>Add to Wishlist</button>
    <button>Book Now</button>
  </div>

</div>
    </>
  )
}

export default Propertydetails
