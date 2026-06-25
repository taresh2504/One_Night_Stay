import React from 'react'
import { useState } from 'react'
import logo from '../assets/One_Night_Stay_Logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const isLoggedIn = false;

  return (
    <>
      <div className='navbar'>
        <img src={logo} alt="logo"  className='navlogo'/>

        <ul className='navlist'>
            <li><Link to="/" className='nav-link'>Home</Link></li>
            <li><Link to="/properties" className='nav-link'>Properties</Link></li>
            <li><Link to="/about" className='nav-link'>About us</Link></li>
            <li><Link to="/contact" className='nav-link'>Contact</Link></li>
            <li><Link to="/services" className='nav-link'>Services</Link></li>
        </ul>

        <div className='butonbox'>

  {isLoggedIn ? (

    <Link to="/profile" className="profile-link">
      <FaUserCircle className="profile-icon" />
    </Link>

  ) : (

    <>
      <Link to="/register" className='nav-link2'>
        <div className='reg-name'>Register</div>
      </Link>

      <Link to="/login" className='nav-link2'>
        <div className='reg-name'>Log-in</div>
      </Link>
    </>

  )}

</div>
      </div>
    </>
  )
}

export default Navbar
