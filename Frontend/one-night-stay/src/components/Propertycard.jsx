import React from 'react'
import '../App.css'
import logo from '../assets/One_Night_Stay_Logo.jpg'

const Propertycard = () => {
  return (
    <div className='cardholder'>

      <div className='imagecontainer'>
        <img
          src={logo}
          className='propertyimage'
          alt="property"
        />

        {/* <div className='wishlisticon'>
          ❤️
        </div> */}
      </div>

      <div className='cardcontent'>

        <div className='propertyname'>
          Taj Hotel Mumbai
        </div>

        <div className='propertylocation'>
          Mumbai, Maharashtra
        </div>

        {/* <div className='propertyrating'>
          ⭐ 4.8
        </div> */}

        <div className='wishlistcontainer'>
          <p className='propertyprice'>
            ₹25,000 <span>/ Night</span>
          </p>

          <button className='wishlistbutton'>
            Wishlist
          </button>
        </div>

      </div>

    </div>
  )
}

export default Propertycard