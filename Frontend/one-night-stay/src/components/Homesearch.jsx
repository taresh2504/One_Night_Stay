import React from 'react'
import '../App.css'
import hotelinterior from '../assets/hotelinterior.mp4'

const Homesearch = () => {
  return (
    <>
      <div className='srchhomeholder'>

        <video src={hotelinterior} autoPlay muted loop playsInline className='hotelvideo'></video>
        <div className='overlay'></div>

        <div className='searchbox'>
          <h1>Find Your Perfect Stay</h1>

          <div className='searchbar'>
            <input type="search" placeholder='Search Hotels, Resorts, Rooms...'/>

            <button type="submit">Search</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default Homesearch