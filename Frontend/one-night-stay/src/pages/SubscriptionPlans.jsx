import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const SubscriptionPlans = () => {

    const navigate = useNavigate();

    const handleApply = (planId) => {

    console.log("Selected Plan:", planId);

    alert(
      "Plan request submitted successfully. Waiting for admin approval."
    );

    navigate("/");
  };
  return (
    <div className="plans-container">

      <h1>Choose Your Hosting Plan</h1>
      <p>Select a plan to become a Host</p>

      <div className="plans-grid">

        {/* Basic */}

        <div className="plan-card">
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

        {/* Premium */}

        <div className="plan-card">
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

        {/* Pro */}

        <div className="plan-card">
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

      <p className="skip-host">
  Don't want to become a host?{" "}
  <span onClick={() => navigate("/")}>
    Move to Home
  </span>
</p>

    </div>
  );
};

export default SubscriptionPlans;