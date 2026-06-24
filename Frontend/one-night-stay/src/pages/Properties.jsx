import React from 'react'
import '../App.css'
import logo from '../assets/One_Night_Stay_Logo.jpg'
import { IoWifi } from "react-icons/io5";
import { HiOutlineTv } from "react-icons/hi2";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiCarBatteryFill } from "react-icons/pi";

const Properties = () => {
  return (
    <>
      <div className='search-and-sortholder'>
        <form action="" method="post">
            <input type="search" placeholder='Search Hotel,Resort,Bungalow......' name="" id="" /> <button type="submit">Search</button>
        </form>
        <br />
        <form action="" method="post">
            <select name="" id="">
                <option value="" disabled selected>Sort here</option>
                <option value="">Price High to Low</option>
                <option value="">Price Low to High</option>
                <option value="">Name A to Z</option>
                <option value="">Name Z to A</option>
                <option value="">Hotels</option>
                <option value="">Resorts</option>
            </select>
        </form>
      </div>
      <br />
      <div className='properties-card'>
        <div className='photo-section'>
            <div className='main-photo'><img src={logo} alt="" /></div>
            <div className='sub-photo'>
                <img src={logo}  alt="" /><img src={logo} alt="" /><img src={logo}  alt="" />
            </div>
        </div>

        <div className='detail'>
            <h1>The Leela Palace</h1>
            <h3>📍 New Delhi, India</h3>
            <br />
            <div className='facility'>
                <p><IoWifi/>Free Wi-Fi</p>
                <p><HiOutlineTv/>T.V Available</p>
                <p><CgSmartHomeRefrigerator/>Fridge</p>
                <p><PiCarBatteryFill/>Power Backup</p>
            </div>
            <br />
            <br />
            <div className='detail-end'>
            <h2>₹25,000 / Night</h2>  
            <div className='detail-buttons'>
                <form action="" method="post">
                    <button type="submit">View Details</button>
                </form>

                <form action="" method="post">
                    <button type="submit">Book now</button>
                </form>
            </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Properties
