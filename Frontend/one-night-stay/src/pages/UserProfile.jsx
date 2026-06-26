import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import axios from "axios";
import { useEffect } from "react";

const UserProfile = () => {

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");
    const role = localStorage.getItem("role");
    const hostStatus = localStorage.getItem("host_status");
    const createdAt = localStorage.getItem("created_at");// user | host | admin
    console.log(localStorage.getItem("access"));

    const [activeTab, setActiveTab] = useState("My Profile");
    const [myProperties, setMyProperties] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [hostBookings, setHostBookings] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [hostReviews, setHostReviews] = useState([]);
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);

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
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {

    fetchMyProperties();
    fetchMyBookings();
    fetchHostBookings();
    fetchWishlist();
    fetchHostReviews();
    fetchPayments();

    }, []);

    useEffect(() => {

    if(role === "admin"){
        fetchUsers();
    }

    }, []);
    
    const fetchMyProperties = async () => {
  try {
    const token = localStorage.getItem("access");
    console.log("Token:", token);

    const response = await axios.get(
      "http://127.0.0.1:8000/my-properties/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("My Properties:", response.data);

    setMyProperties(response.data);

  } catch (error) {
    console.log(error.response);
  }
};

    const fetchMyBookings = async () => {
  try {
    const token = localStorage.getItem("access");

    const response = await axios.get(
      "http://127.0.0.1:8000/my-bookings/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Host Bookings:", response.data);

    setMyBookings(response.data);

  } catch (error) {
    console.log(error);
  }
};

    const fetchHostBookings = async () => {
  try {
    const token = localStorage.getItem("access");

    const response = await axios.get(
      "http://127.0.0.1:8000/host/bookings/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHostBookings(response.data);

  } catch (error) {
    console.log(error);
  }
};

    const fetchWishlist = async () => {

  try {

    const token = localStorage.getItem("access");

    const response = await axios.get(
      "http://127.0.0.1:8000/my-wishlist/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setWishlist(response.data);

  } catch (error) {
    console.log(error);
  }

};

    const fetchHostReviews = async () => {

  try {

    const token = localStorage.getItem("access");

    const response = await axios.get(
      "http://127.0.0.1:8000/host/reviews/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHostReviews(response.data);

  } catch (error) {
    console.log(error);
  }

};

    const fetchPayments = async () => {

    try {

        const token = localStorage.getItem("access");

        const response = await axios.get(
            "http://127.0.0.1:8000/payment-history/",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setPayments(response.data);

    } catch (error) {
        console.log(error);
    }
};

    const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("access");

    console.log("Token:", token);

    const response = await axios.get(
      "http://127.0.0.1:8000/users/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Users:", response.data);

    setUsers(response.data);

  } catch (error) {
    console.log(error.response);
  }
};

  return (
    <div className="profile-container">

      <div className="profile-sidebar">

        <div className="profile-header">
          <div className="profile-avatar">
            👤
          </div>

          <h3>{name}</h3>
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
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Role:</strong> {role}</p>

                {role === "host" && (
                <p><strong>Host Status:</strong> {hostStatus}</p>
                )}
              {/* <p>
  <strong>Date Joined:</strong>{" "}
  {new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}
</p> */}
            </>
          )}

         
           {activeTab === "Payment History" && (
<>
<h2>Payment History</h2>

<div className="payment-container">

{payments.length === 0 ? (

<div className="no-data">
<h3>No Payment History</h3>

<p>
You haven't made any payments yet.
</p>

</div>

) : (

payments.map((payment) => (

<div
className="admin-payment-card"
key={payment.id}
>

<h3>{payment.property_title}</h3>

<p>
<strong>Location:</strong> {payment.property_location}
</p>

<p>
<strong>Amount:</strong> ₹{payment.amount}
</p>

<p>
<strong>Status:</strong> {payment.payment_status}
</p>

<p>
<strong>Order ID:</strong> {payment.razorpay_order_id}
</p>

<p>
<strong>Payment ID:</strong>{" "}
{payment.razorpay_payment_id || "-"}
</p>

<p>
<strong>Paid On:</strong>{" "}
{payment.paid_at
? new Date(payment.paid_at).toLocaleDateString("en-GB")
: "-"}
</p>

</div>

))

)}

</div>

</>
)}
            {activeTab === "My Reviews" && (
  <>
    <h2>My Reviews</h2>

    <div className="no-data">
      <h3>No Reviews Yet</h3>

      <p>
        You haven't reviewed any property yet.
      </p>
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

      {myProperties.length === 0 ? (

        <div className="no-data">
          <h3>No Properties Found</h3>
          <p>You haven't added any properties yet.</p>
        </div>

      ) : (

        myProperties.map((property) => (

          <div className="host-property-card" key={property.id}>

            <h3>{property.title}</h3>

            <p>📍 {property.location}</p>

            <p>
              <strong>Property Type:</strong> {property.property_type}
            </p>

            <p>
              <strong>Price:</strong> ₹{property.price} / Night
            </p>

            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>

            <p>
              <strong>Bathrooms:</strong> {property.bathrooms}
            </p>

            <p>
              <strong>Beds:</strong> {property.beds}
            </p>

            <p>
              <strong>Max Guests:</strong> {property.max_guests}
            </p>

            <p>
              <strong>Added On:</strong>{" "}
              {new Date(property.created_at).toLocaleDateString("en-GB")}
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

        ))

      )}

    </div>
  </>
)}

            {activeTab === "Show Bookings" && (
  <>
    <h2>Property Bookings</h2>

    <div className="host-bookings-container">

      {hostBookings.length === 0 ? (

        <div className="no-data">
          <h3>No Bookings Found</h3>
          <p>No one has booked your properties yet.</p>
        </div>

      ) : (

        hostBookings.map((booking) => (

          <div
            className="host-booking-card"
            key={booking.id}
          >

            <h3>{booking.property_title}</h3>

            <p>
              <strong>Booked By:</strong> {booking.user_name}
            </p>

            <p>
              <strong>Email:</strong> {booking.user_email}
            </p>

            <p>
              <strong>Check In:</strong>{" "}
              {new Date(booking.check_in).toLocaleDateString("en-GB")}
            </p>

            <p>
              <strong>Check Out:</strong>{" "}
              {new Date(booking.check_out).toLocaleDateString("en-GB")}
            </p>

            <p>
              <strong>Guests:</strong> {booking.guests_count}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹{booking.total_price}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {booking.booking_status}
            </p>

            <p>
              <strong>Booked On:</strong>{" "}
              {new Date(booking.created_at).toLocaleDateString("en-GB")}
            </p>

          </div>

        ))

      )}

    </div>
  </>
)}

            {activeTab === "My Bookings" && (
  <>
    <h2>My Bookings</h2>

    <div className="my-bookings-container">

      {myBookings.length === 0 ? (

        <div className="no-data">
          <h3>No Bookings Yet</h3>
          <p>You haven't booked any property yet.</p>
        </div>

      ) : (

        myBookings.map((booking) => (

          <div
            className="host-booking-card"
            key={booking.id}
          >

            <h3>{booking.property_title}</h3>

            <p>
              <strong>Location:</strong> {booking.property_location}
            </p>

            <p>
              <strong>Property Type:</strong> {booking.property_type}
            </p>

            <p>
              <strong>Check In:</strong>{" "}
              {new Date(booking.check_in).toLocaleDateString("en-GB")}
            </p>

            <p>
              <strong>Check Out:</strong>{" "}
              {new Date(booking.check_out).toLocaleDateString("en-GB")}
            </p>

            <p>
              <strong>Guests:</strong> {booking.guests_count}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹{booking.total_price}
            </p>

            <p>
              <strong>Status:</strong> {booking.booking_status}
            </p>

            <p>
              <strong>Booked On:</strong>{" "}
              {new Date(booking.created_at).toLocaleDateString("en-GB")}
            </p>

          </div>

        ))

      )}

    </div>
  </>
)}

            {activeTab === "Wishlist" && (
  <>
    <h2>My Wishlist</h2>

    <div className="wishlist-container">

      {wishlist.length === 0 ? (

        <div className="no-data">
          <h3>No Wishlist Yet</h3>
          <p>You haven't added any property to your wishlist.</p>
        </div>

      ) : (

        wishlist.map((item) => (

          <div
            className="host-property-card"
            key={item.id}
          >

            <h3>{item.property_title}</h3>

            <p>
              📍 {item.property_location}
            </p>

            <p>
              <strong>Property Type:</strong> {item.property_type}
            </p>

            <p>
              <strong>Price:</strong> ₹{item.property_price} / Night
            </p>

          </div>

        ))

      )}

    </div>
  </>
)}

           {activeTab === "Show Reviews" && (
  <>
    <h2>Property Reviews</h2>

    <div className="host-reviews-container">

      {hostReviews.length === 0 ? (

        <div className="no-data">
          <h3>No Reviews Yet</h3>
          <p>No reviews have been received for your properties.</p>
        </div>

      ) : (

        hostReviews.map((review) => (

          <div
            className="host-review-card"
            key={review.id}
          >

            <h3>{review.property_title}</h3>

            <p>
              <strong>Reviewed By:</strong> {review.user_name}
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {review.rating}/5
            </p>

            <p>
              <strong>Comment:</strong> {review.comment}
            </p>

            <p>
              <strong>Reviewed On:</strong>{" "}
              {new Date(review.created_at).toLocaleDateString("en-GB")}
            </p>

          </div>

        ))

      )}

    </div>
  </>
)}

                {
                activeTab === "Show Users" && (

                <div className="profile-section">

                <h2>All Users</h2>

                <table className="users-table">

                <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Host Status</th>
                </tr>
                </thead>

                <tbody>

                {users.length === 0 ? (

                <tr>
                <td colSpan="5">No Users Found</td>
                </tr>

                ) : (

                users.map((user) => (

                <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.host_status}</td>
                </tr>

                ))

                )}

                </tbody>

                </table>

                </div>

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