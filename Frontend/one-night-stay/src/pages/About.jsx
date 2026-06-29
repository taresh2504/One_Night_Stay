import React from "react";
import "../App.css";

const About = () => {
  return (
    <div className="container-fluid about-container py-5">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-10">

            <div className="about-box shadow-lg">

              <h1 className="about-heading text-center mb-4">
                About Us
              </h1>

              <p className="about-info">
                Welcome to <strong>One Night Stay</strong>, your trusted
                platform for discovering exceptional stays and unforgettable
                travel experiences. We connect travelers with a wide range of
                properties, including luxury hotels, resorts, villas,
                apartments, and vacation homes across various destinations.
              </p>

              <p className="about-info">
                Our mission is to make finding and booking accommodations
                simple, secure, and convenient. Whether you're planning a
                family vacation, business trip, weekend getaway, or long-term
                stay, we help you find the perfect place that matches your
                needs and budget.
              </p>

              <p className="about-info">
                We focus on providing a seamless user experience, verified
                property listings, transparent pricing, and reliable customer
                support to ensure every journey starts with confidence.
              </p>

              <p className="about-info mb-0">
                At <strong>One Night Stay</strong>, we believe every trip
                deserves a comfortable, memorable, and hassle-free stay.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;