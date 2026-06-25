import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

const UserProfile = () => {

  const role = "user"; // user | host | admin

  const [activeTab, setActiveTab] = useState("My Profile");

  const userMenu = [
    "My Profile",
    "My Bookings",
    "Wishlist",
    "Payment History",
    "My Reviews",
    "Become a Host",
    "Logout"
  ];

  const hostMenu = [
    "My Profile",
    "Add Property",
    "Add Property Images",
    "Show Properties",
    "Show Bookings",
    "My Bookings",
    "Wishlist",
    "Show Reviews",
    "Payment History",
    "Logout"
  ];

  const adminMenu = [
    "My Profile",
    "Show Users",
    "Show Hosts",
    "Subscription Approval",
    "Show All Properties",
    "Show All Bookings",
    "All Payment History",
    "Show All Reviews",
    "Logout"
  ];

  const menu =
    role === "user"
      ? userMenu
      : role === "host"
      ? hostMenu
      : adminMenu;

    const navigate = useNavigate();

    const handleLogout = () => {
    navigate("/login");
    };  

  return (
    <div className="profile-container">

      <div className="profile-sidebar">

        <div className="profile-header">
          <div className="profile-avatar">
            👤
          </div>

          <h3>Taresh</h3>
          <p>{role.toUpperCase()}</p>
        </div>

        <ul className="profile-menu">
          {menu.map((item, index) => (
            <li
              key={index}
              className={activeTab === item ? "active-menu" : ""}
              onClick={() => {
            if (item === "Logout") {
                handleLogout();
            } else {
                setActiveTab(item);
            }
            }}
            >
              {item}
            </li>
          ))}
        </ul>

      </div>

      <div className="profile-content">

        <h1>{activeTab}</h1>

        <div className="content-box">

          {activeTab === "My Profile" && (
            <>
              <h2>User Information</h2>
              <p><strong>Name:</strong> Taresh Tandy</p>
              <p><strong>Email:</strong> taresh25202@gmail.com</p>
              <p><strong>Phone:</strong> +91 9876543210</p>
              <p><strong>Role:</strong> {role}</p>

                {role === "host" && (
                <p><strong>Host Status:</strong> Approved</p>
                )}
              <p><strong>Date Joined:</strong> 12 June 2026</p>
            </>
          )}

          {activeTab === "My Bookings" && (
            <>
                <h2>My Bookings</h2>

                <div className="booking-card">

                <h3>The Leela Palace</h3>

                <p>📍 New Delhi, India</p>

                <p>
                    <strong>Check In:</strong> 15 Aug 2026
                </p>

                <p>
                    <strong>Check Out:</strong> 18 Aug 2026
                </p>

                <p>
                    <strong>Guests:</strong> 2
                </p>

                <p>
                    <strong>Amount Paid:</strong> ₹75,000
                </p>

                <p>
                    <strong>Payment Status:</strong>
                    <span className="paid"> Paid</span>
                </p>

                <p>
                    <strong>Booking Status:</strong>
                    <span className="confirmed"> Confirmed</span>
                </p>

                <p>
                    <strong>Booked On:</strong> 12 Jun 2026
                </p>

                <button className="view-booking-btn">
                    View Details
                </button>

                </div>
            </>
            )}

            {activeTab === "Wishlist" && (
            <>
                <h2>My Wishlist</h2>

                <div className="wishlist-card">

                <h3>The Leela Palace</h3>

                <p>📍 New Delhi, India</p>

                <p>
                    <strong>Price:</strong> ₹25,000 / Night
                </p>

                <p>
                    <strong>Added On:</strong> 25 Jun 2026
                </p>

                <div className="wishlist-buttons">
                    <button className="view-btn">
                    View Details
                    </button>

                    <button className="remove-btn">
                    Remove
                    </button>
                </div>

                </div>
            </>
            )}

            {activeTab === "Payment History" && (
            <>
                <h2>Payment History</h2>

                <div className="payment-card">

                <h3>The Leela Palace</h3>

                <p>
                    <strong>Payment Amount:</strong>
                    ₹25,000
                </p>

                <p>
                    <strong>Payment Status:</strong>
                    <span className="success-status">
                    Success
                    </span>
                </p>

                <p>
                    <strong>Razorpay Payment ID:</strong>
                    <br />
                    pay_SaB8HbfiRFL3Os
                </p>

                <p>
                    <strong>Paid On:</strong>
                    25 Jun 2026
                </p>

                <p>
                    <strong>Booking ID:</strong>
                    #12
                </p>

                <button className="view-payment-btn">
                    View Booking
                </button>

                </div>
            </>
            )}

            {activeTab === "My Reviews" && (
            <>
                <h2>My Reviews</h2>

                <div className="review-card">

                <h3>The Leela Palace</h3>

                <p>
                    <strong>Rating:</strong> ⭐⭐⭐⭐⭐
                </p>

                <p>
                    <strong>Comment:</strong>
                    Amazing stay with excellent service and facilities.
                </p>

                <p>
                    <strong>Reviewed On:</strong>
                    25 Jun 2026
                </p>

                <div className="review-buttons">
                    <button className="edit-review-btn">
                    Edit Review
                    </button>

                    <button className="delete-review-btn">
                    Delete Review
                    </button>
                </div>

                </div>
            </>
            )}

            {activeTab === "Become a Host" && (
                <>
                    <h2>Become a Host</h2>

                    <div className="become-host-card">

                    <h3>Start Hosting With One Night Stay</h3>

                    <p>
                        Choose a hosting subscription plan and start
                        listing your properties on our platform.
                    </p>

                    <button
                        className="become-host-btn"
                        onClick={() => navigate("/subscription-plans")}
                    >
                        View Subscription Plans
                    </button>

                    </div>
                </>
                )}

            {activeTab === "Add Property" && (
            <>
                <h2>Add Property</h2>

                <form className="add-property-form">

                <label>Property Title</label>
                <input type="text" placeholder="Enter property title" />

                <label>Location</label>
                <input type="text" placeholder="Enter location" />

                <label>Price Per Night</label>
                <input type="number" placeholder="Enter price" />

                <label>Property Type</label>
                <select>
                    <option value="">Select Property Type</option>
                    <option value="room">Room</option>
                    <option value="flat">Flat</option>
                    <option value="hotel">Hotel</option>
                    <option value="resort">Resort</option>
                    <option value="bungalow">Bungalow</option>
                </select>

                <label>Bedrooms</label>
                <input type="number" placeholder="Enter bedrooms" />

                <label>Bathrooms</label>
                <input type="number" placeholder="Enter bathrooms" />

                <label>Beds</label>
                <input type="number" placeholder="Enter beds" />

                <label>Max Guests</label>
                <input type="number" placeholder="Enter max guests" />

                <label>Description</label>
                <textarea
                    rows="5"
                    placeholder="Enter property description"
                ></textarea>

                {/* <div className="featured-box">
                    <input type="checkbox" />
                    <label>Featured Property</label>
                </div> */}

                <button type="submit">
                    Add Property
                </button>

                </form>
            </>
            )}

            {activeTab === "Add Property Images" && (
            <>
                <h2>Add Property Images</h2>

                <form className="property-image-form">

                <label>Select Property</label>
                <select>
                    <option value="">
                    Select Property
                    </option>
                    <option value="1">
                    The Leela Palace
                    </option>
                    <option value="2">
                    Rambagh Palace
                    </option>
                </select>

                <label>Upload Image</label>
                <input type="file" />

                <label>Image Type</label>
                <select>
                    <option value="">
                    Select Image Type
                    </option>

                    <option value="hall">
                    Hall
                    </option>

                    <option value="bedroom">
                    Bedroom
                    </option>

                    <option value="bathroom">
                    Bathroom
                    </option>

                    <option value="washroom">
                    Washroom
                    </option>

                    <option value="kitchen">
                    Kitchen
                    </option>

                    <option value="exterior">
                    Exterior
                    </option>
                </select>

                <button type="submit">
                    Upload Image
                </button>

                </form>
            </>
            )}

            {activeTab === "Show Properties" && (
            <>
                <h2>My Properties</h2>

                <div className="host-properties-container">

                <div className="host-property-card">

                    <img
                    src="https://via.placeholder.com/300x180"
                    alt="property"
                    />

                    <h3>The Leela Palace</h3>

                    <p>📍 New Delhi, India</p>

                    <p>
                    <strong>Property Type:</strong> Hotel
                    </p>

                    <p>
                    <strong>Price:</strong> ₹25,000 / Night
                    </p>

                    <p>
                    <strong>Bedrooms:</strong> 80
                    </p>

                    <p>
                    <strong>Bathrooms:</strong> 80
                    </p>

                    <p>
                    <strong>Beds:</strong> 120
                    </p>

                    <p>
                    <strong>Max Guests:</strong> 200
                    </p>

                    <p>
                    <strong>Added On:</strong> 12 Jun 2026
                    </p>

                    <div className="property-action-buttons">

                    <button className="view-property-btn">
                        View
                    </button>

                    <button className="edit-property-btn">
                        Edit
                    </button>

                    <button className="delete-property-btn">
                        Delete
                    </button>

                    </div>

                </div>

                </div>
            </>
            )}

            {activeTab === "Show Bookings" && (
            <>
                <h2>Property Bookings</h2>

                <div className="host-booking-card">

                <h3>The Leela Palace</h3>

                <p>
                    <strong>Booked By:</strong> Taresh Tandy
                </p>

                <p>
                    <strong>Email:</strong> taresh25202@gmail.com
                </p>

                <p>
                    <strong>Check In:</strong> 15 Aug 2026
                </p>

                <p>
                    <strong>Check Out:</strong> 18 Aug 2026
                </p>

                <p>
                    <strong>Guests:</strong> 2
                </p>

                <p>
                    <strong>Total Amount:</strong> ₹75,000
                </p>

                <p>
                    <strong>Status:</strong>
                    <span className="confirmed-status">
                    Confirmed
                    </span>
                </p>

                <p>
                    <strong>Booked On:</strong> 12 Jun 2026
                </p>

                <button className="view-booking-btn">
                    View Details
                </button>

                </div>
            </>
            )}

            {activeTab === "Show Reviews" && (
            <>
                <h2>Property Reviews</h2>

                <div className="host-review-card">

                <h3>The Leela Palace</h3>

                <p>
                    <strong>Reviewed By:</strong> Taresh Tandy
                </p>

                <p>
                    <strong>Rating:</strong> ⭐⭐⭐⭐⭐
                </p>

                <p>
                    <strong>Comment:</strong>
                    Amazing stay with excellent service and facilities.
                </p>

                <p>
                    <strong>Reviewed On:</strong>
                    25 Jun 2026
                </p>

                </div>
            </>
            )}

            {activeTab === "Show Users" && (
            <>
                <h2>All Users</h2>

                <div className="admin-user-card">

                <h3>Taresh Tandy</h3>

                <p>
                    <strong>Username:</strong> taresh123
                </p>

                <p>
                    <strong>Email:</strong> taresh25202@gmail.com
                </p>

                <p>
                    <strong>Phone:</strong> +91 9876543210
                </p>

                <p>
                    <strong>Role:</strong> User
                </p>

                <p>
                    <strong>Joined On:</strong> 12 Jun 2026
                </p>

                <div className="admin-user-buttons">
                    <button>View Profile</button>
                </div>

                </div>
            </>
            )}

            {activeTab === "Show Hosts" && (
            <>
                <h2>All Hosts</h2>

                <div className="admin-host-card">

                <h3>Rahul Sharma</h3>

                <p>
                    <strong>Username:</strong> rahulhost
                </p>

                <p>
                    <strong>Email:</strong> rahul@gmail.com
                </p>

                <p>
                    <strong>Phone:</strong> +91 9876543210
                </p>

                <p>
                    <strong>Role:</strong> Host
                </p>

                <p>
                    <strong>Host Status:</strong>
                    <span className="approved-host">
                    Approved
                    </span>
                </p>

                <p>
                    <strong>Joined On:</strong>
                    12 Jun 2026
                </p>

                <button className="view-host-btn">
                    View Profile
                </button>

                </div>
            </>
            )}

            {activeTab === "Subscription Approval" && (
            <>
                <h2>Host Approval Requests</h2>

                <div className="host-approval-card">

                <h3>Rahul Sharma</h3>

                <p>
                    <strong>Email:</strong> rahul@gmail.com
                </p>

                <p>
                    <strong>Phone:</strong> +91 9876543210
                </p>

                <p>
                    <strong>Role:</strong> Host
                </p>

                <p>
                    <strong>Status:</strong>
                    <span className="pending-host">
                    Pending
                    </span>
                </p>

                <p>
                    <strong>Applied On:</strong>
                    25 Jun 2026
                </p>

                <div className="approval-buttons">

                    <button className="approve-btn">
                    Approve
                    </button>

                    <button className="reject-btn">
                    Reject
                    </button>

                </div>

                </div>
            </>
            )}

            {activeTab === "Show All Properties" && (
            <>
                <h2>All Properties</h2>

                <div className="admin-property-card">

                <h3>The Leela Palace</h3>

                <p>
                    <strong>Host:</strong> Rahul Sharma
                </p>

                <p>
                    <strong>Location:</strong> New Delhi, India
                </p>

                <p>
                    <strong>Property Type:</strong> Hotel
                </p>

                <p>
                    <strong>Price:</strong> ₹25,000 / Night
                </p>

                <p>
                    <strong>Bedrooms:</strong> 80
                </p>

                <p>
                    <strong>Bathrooms:</strong> 80
                </p>

                <p>
                    <strong>Beds:</strong> 120
                </p>

                <p>
                    <strong>Max Guests:</strong> 200
                </p>

                <p>
                    <strong>Added On:</strong> 12 Jun 2026
                </p>

                <div className="admin-property-buttons">

                    <button className="view-property-btn">
                    View
                    </button>

                </div>

                </div>
            </>
            )}

            {activeTab === "Show All Bookings" && (
            <>
                <h2>All Bookings</h2>

                <div className="admin-booking-card">

                <h3>The Leela Palace</h3>

                <p>
                    <strong>Booked By:</strong>
                    Taresh Tandy
                </p>

                <p>
                    <strong>Check In:</strong>
                    15 Aug 2026
                </p>

                <p>
                    <strong>Check Out:</strong>
                    18 Aug 2026
                </p>

                <p>
                    <strong>Guests:</strong>
                    2
                </p>

                <p>
                    <strong>Total Price:</strong>
                    ₹75,000
                </p>

                <p>
                    <strong>Booking Status:</strong>
                    <span className="confirmed-status">
                    Confirmed
                    </span>
                </p>

                <p>
                    <strong>Booked On:</strong>
                    12 Jun 2026
                </p>

                <button className="view-booking-btn">
                    View Details
                </button>

                </div>
            </>
            )}

            {activeTab === "All Payment History" && (
                <>
                    <h2>All Payment History</h2>

                    <div className="admin-payment-card">

                    <h3>The Leela Palace</h3>

                    <p>
                        <strong>User:</strong>
                        Taresh Tandy
                    </p>

                    <p>
                        <strong>Booking ID:</strong>
                        #12
                    </p>

                    <p>
                        <strong>Amount:</strong>
                        ₹25,000
                    </p>

                    <p>
                        <strong>Payment Status:</strong>
                        <span className="success-status">
                        Success
                        </span>
                    </p>

                    <p>
                        <strong>Razorpay Order ID:</strong>
                        order_SaB8HbfiRFL3Os
                    </p>

                    <p>
                        <strong>Razorpay Payment ID:</strong>
                        pay_SaB8HbfiRFL3Os
                    </p>

                    <p>
                        <strong>Paid On:</strong>
                        25 Jun 2026
                    </p>

                    <button className="view-payment-btn">
                        View Booking
                    </button>

                    </div>
                </>
                )}

                {activeTab === "Show All Reviews" && (
            <>
                <h2>All Reviews</h2>

                <div className="admin-review-card">

                <h3>The Leela Palace</h3>

                <p>
                    <strong>Reviewed By:</strong>
                    Taresh Tandy
                </p>

                <p>
                    <strong>Rating:</strong>
                    ⭐⭐⭐⭐⭐
                </p>

                <p>
                    <strong>Comment:</strong>
                    Amazing stay with excellent service and facilities.
                </p>

                <p>
                    <strong>Reviewed On:</strong>
                    25 Jun 2026
                </p>

                <div className="admin-review-buttons">

                    <button className="view-review-btn">
                    View Property
                    </button>

                    <button className="delete-review-btn">
                    Delete Review
                    </button>

                </div>

                </div>
            </>
            )}
        </div>

      </div>

    </div>
  );
};

export default UserProfile;