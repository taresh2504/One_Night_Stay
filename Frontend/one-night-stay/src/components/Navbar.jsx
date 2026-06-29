import logo from "../assets/One_Night_Stay_Logo.jpg";
import { Link } from "react-router-dom";
import "../App.css";
import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    };

    window.addEventListener("storage", checkLogin);
    checkLogin();

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">

      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="logo"
            className="navlogo"
          />
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >

          {/* <ul className="navbar-nav mx-auto navlist"> */}
          <ul className="navbar-nav mx-auto custom-navlist">

            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/properties" className="nav-link">
                Properties
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About us
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/services" className="nav-link">
                Services
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-2 butonbox">

            {isLoggedIn ? (
              <Link to="/profile" className="profile-link">
                <FaUserCircle className="profile-icon" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="nav-link2">
                  <div className="reg-name">
                    Register
                  </div>
                </Link>

                <Link to="/login" className="nav-link2">
                  <div className="reg-name">
                    Log-in
                  </div>
                </Link>
              </>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;