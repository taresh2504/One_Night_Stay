import React from "react";
import "../App.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="container-fluid contact-container py-5">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-8 col-md-10">

            <div className="contact-box shadow-lg">

              <h1 className="contact-heading text-center mb-4">
                Contact Us
              </h1>

              <div className="contact-info">

                <div className="mb-4">
                  <h4>📧 Email</h4>
                  <p>taresh430@gmail.com</p>
                </div>

                <div className="mb-4">
                  <h4>📞 Phone</h4>
                  <p>+91 7400962298</p>
                </div>

                <div className="mb-4">
                  <h4>📍 Address</h4>
                  <p>Bhopal, Madhya Pradesh, India</p>
                </div>

                <div className="mb-4">
                  <h4>🕒 Business Hours</h4>
                  <p>Monday - Saturday : 9:00 AM - 7:00 PM</p>
                  <p>Sunday : Closed</p>
                </div>

                <div>

                  <h4>🌐 Follow Us</h4>

                  <div className="social-links">

                    <div className="social-item">
                      <FaFacebook className="social-icon" />
                      <span>@One_Night_Stay</span>
                    </div>

                    <div className="social-item">
                      <FaInstagram className="social-icon" />
                      <span>@One_Night_Stay</span>
                    </div>

                    <div className="social-item">
                      <FaXTwitter className="social-icon" />
                      <span>@One_Night_Stay</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;