import React from 'react'
import '../App.css'
import { GrInstagram } from "react-icons/gr"
import { FaXTwitter } from "react-icons/fa6"
import { FaFacebookSquare } from "react-icons/fa"

const Footer = () => {
  return (
    <>
    <div className='footerbox'>
      <div className='footer'>

        <div className='navlist2'>
            <p className='nav-link'>Customer Care : 007</p>
            <p className='nav-link'>Email : taresh25202@gmail.com</p>
            <p className='nav-link'>24X7 Helpline</p>
        </div>

        <div className='navlist2'>
            <p className='nav-link'>Privacy Policy</p>
            <p className='nav-link'>Refund Rules</p>
            <p className='nav-link'>Cancellation Policy</p>
        </div>

        <div className='navlist3'>
            <p className='navlist3fb'>
                <FaFacebookSquare/><div className='nav-link'>One_Night_Stay</div>
            </p>
            <p className='navlist3ig'>
            <GrInstagram/><div className='nav-link'>One_Night_Stay</div>
            </p>
            <p className='navlist3tw'>
            <FaXTwitter/><div className='nav-link'>One_Night_Stay</div>
            </p>
        </div>

      </div>
    </div>  
    </>
  )
}

export default Footer
