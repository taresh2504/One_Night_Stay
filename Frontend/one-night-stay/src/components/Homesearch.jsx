import React from 'react'
import '../App.css'
import hotelinterior from '../assets/hotelinterior.mp4'

const Homesearch = ({
  search,
  setSearch,
  handleSearch,
}) => {
  return (
    <>
      <div className='srchhomeholder'>

        <video src={hotelinterior} autoPlay muted loop playsInline className='hotelvideo'></video>
        <div className='overlay'></div>

        <div className='searchbox'>
          <h1>Find Your Perfect Stay</h1>

          <div className='searchbar'>
            <input
  type="search"
  placeholder="Search Hotels, Resorts..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

            <button type="submit" onClick={handleSearch}>Search</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default Homesearch