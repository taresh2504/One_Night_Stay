import React from "react";
import "../App.css";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footerbox">

      <div className="container">

        <div className="row footer">

          {/* Customer Care */}

          <div className="col-lg-4 col-md-4 col-sm-12 mb-4">

            <div className="navlist2">
              <p className="nav-link3">Customer Care : 007</p>
              <p className="nav-link3">Email : taresh25202@gmail.com</p>
              <p className="nav-link3">24X7 Helpline</p>
            </div>

          </div>

          {/* Policies */}

          <div className="col-lg-4 col-md-4 col-sm-12 mb-4">

            <div className="navlist2">
              <p className="nav-link3">Privacy Policy</p>
              <p className="nav-link3">Refund Rules</p>
              <p className="nav-link3">Cancellation Policy</p>
            </div>

          </div>

          {/* Social Media */}

          <div className="col-lg-4 col-md-4 col-sm-12 mb-4">

            <div className="navlist3">

              <p className="navlist3fb">
                <FaFacebookSquare />
                <span className="nav-link3">
                  One_Night_Stay
                </span>
              </p>

              <p className="navlist3ig">
                <GrInstagram />
                <span className="nav-link3">
                  One_Night_Stay
                </span>
              </p>

              <p className="navlist3tw">
                <FaXTwitter />
                <span className="nav-link3">
                  One_Night_Stay
                </span>
              </p>

            </div>

          </div>

        </div>

        <hr />

        <div className="text-center endline">

          <p className="nav-link3 mb-0">
            © 2026 One_Night_Stay | Helpline: 007 | All Rights Reserved
          </p>

        </div>

      </div>

    </div>
  );
};

export default Footer;