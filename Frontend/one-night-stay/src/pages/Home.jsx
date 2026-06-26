import React from 'react'
import Navbar from '../components/Navbar'
import Homesearch from '../components/Homesearch'
import Propertycard from '../components/Propertycard'
import Footer from '../components/Footer'
import { FaArrowRightLong } from "react-icons/fa6";
import '../App.css'

const Home = () => {
  return (
    <>
      {/* <Navbar/> */}
      <Homesearch/>
      <br /> <br />
      <h1 className='section-title'>&nbsp;&nbsp;&nbsp;Explore Hotels <FaArrowRightLong/> </h1> <br />
      <div className='home-hotels'>
        <Propertycard/> <Propertycard/> <Propertycard/> <Propertycard/> <Propertycard/>
      </div>
        <br />
      <h1 className='section-title'>&nbsp;&nbsp;&nbsp;Discover Resorts <FaArrowRightLong/> </h1> <br />
      <div className='home-hotels'>
        <Propertycard/> <Propertycard/> <Propertycard/> <Propertycard/> <Propertycard/>
      </div> 
      <br /><br />
      
      {/* <Footer/> */}
    </>
  )
}

export default Home
