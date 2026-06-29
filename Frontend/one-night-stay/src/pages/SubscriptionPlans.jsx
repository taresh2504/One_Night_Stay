import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const handleApply = async (planId) => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.post(
        "http://127.0.0.1:8000/subscribe/",
        {
          plan: planId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Plan request submitted successfully. Waiting for admin approval.");

      console.log(response.data);

      navigate("/");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log(error);

      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="container-fluid plans-container py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1>Choose Your Hosting Plan</h1>
          <p>Select a plan to become a Host</p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="plan-card h-100">
              <h2>Basic</h2>

              <h1>₹100</h1>

              <p>Booking Limit: 5</p>
              <p>Property Limit: 2</p>
              <p>Priority: 1</p>

              <p className="plan-description">
                Basic plan with limited hosting and normal features.
              </p>

              <button className="apply-btn" onClick={() => handleApply(1)}>
                Apply Now
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="plan-card h-100">
              <h2>Premium</h2>

              <h1>₹300</h1>

              <p>Booking Limit: 20</p>
              <p>Property Limit: 10</p>
              <p>Priority: 2</p>

              <p className="plan-description">
                Premium plan with hosting and some features.
              </p>

              <button className="apply-btn" onClick={() => handleApply(2)}>
                Apply Now
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="plan-card h-100">
              <h2>Pro</h2>

              <h1>₹500</h1>

              <p>Booking Limit: 50</p>
              <p>Property Limit: 20</p>
              <p>Priority: 3</p>

              <p className="plan-description">
                Pro plan with advanced hosting and more features.
              </p>

              <button className="apply-btn" onClick={() => handleApply(3)}>
                Apply Now
              </button>
            </div>
          </div>
        </div>

        <p className="skip-host text-center mt-5">
          Don't want to become a host?{" "}
          <span onClick={() => navigate("/")}>Move to Home</span>
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;