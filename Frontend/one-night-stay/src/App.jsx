import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import Homesearch from './components/Homesearch'
import Propertycard from './components/Propertycard'
import Footer from './components/Footer'
import Register from './pages/Register'

const App = () => {
  return (
    <>
      {/* <Navbar/>
      <Homesearch/>
      <br />
      <Propertycard/>
      <br />
      <Footer/> */}
      <Register/>
    </>
  )
}

export default App

// src/

// pages/
// │
// ├── Home.jsx
// ├── Properties.jsx
// ├── PropertyDetails.jsx
// ├── Login.jsx
// ├── Register.jsx
// ├── About.jsx
// ├── Contact.jsx
// └── Services.jsx

// components/
// │
// ├── Navbar.jsx
// ├── Footer.jsx
// ├── HomeSearch.jsx
// └── PropertyCard.jsx

// routes/
// │
// └── AppRoutes.jsx

// services/
// │
// └── api.js
