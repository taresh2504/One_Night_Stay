import React from 'react'
import { useState } from 'react'
import logo from '../assets/One_Night_Stay_Logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

const Navbar = () => {
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
            <Link className='nav-link2'><div className='reg-name'>Register</div></Link>
            <Link className='nav-link2'><div className='reg-name'>Log-in</div></Link>
            {/* <button type="submit"><Link  className='nav-link2'>Register</Link></button>
            <Link className='nav-link2'><button type="submit">Login</button></Link> */}
        </div>
      </div>
    </>
  )
}

export default Navbar
