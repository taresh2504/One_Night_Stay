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
    const [hosts, setHosts] = useState([]);
    const [pendingSubscriptions, setPendingSubscriptions] = useState([]);
    const [allProperties, setAllProperties] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [allPayments, setAllPayments] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [propertyData, setPropertyData] = useState({
            title: "",
            location: "",
            price: "",
            bedrooms: "",
            bathrooms: "",
            description: "",
            property_type: "",
            max_guests: "",
            beds: "",
            is_featured: false,
          });

  const handleChange = (e) => {
  setPropertyData({
    ...propertyData,
    [e.target.name]: e.target.value
  });
};        

  const [imageData, setImageData] = useState({
    property: "",
    image: null,
    image_type: ""
});

  const handleImageChange = (e) => {
  const { name, value, files } = e.target;

  setImageData({
    ...imageData,
    [name]: files ? files[0] : value,
  });
};

  const handleUploadImage = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("access");

    const formData = new FormData();

    formData.append("property", imageData.property);
    formData.append("image", imageData.image);
    formData.append("image_type", imageData.image_type);

    const response = await axios.post(
      "http://127.0.0.1:8000/property-images/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Image uploaded successfully");

    console.log(response.data);

    setImageData({
      property: "",
      image: null,
      image_type: "",
    });

  } catch (error) {
    console.log(error.response?.data);
    console.log(error.response?.status);
  }
};

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
        fetchHosts();
        fetchPendingHosts();
        fetchAllProperties();
        fetchAllBookings();
        fetchAllPayments();
        fetchAllReviews();
        fetchPendingSubscriptions();
        
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
      "http://127.0.0.1:8000/wishlist/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

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

    const fetchHosts = async () => {

  try {

    const token = localStorage.getItem("access");

    const response = await axios.get(
      "http://127.0.0.1:8000/hosts/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHosts(response.data);

  } catch (error) {
    console.log(error.response);
  }

};

    const fetchPendingHosts = async () => {

    try{

        const token = localStorage.getItem("access");

        const response = await axios.get(
            "http://127.0.0.1:8000/pending-hosts/",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        setPendingHosts(response.data);

    }

    catch(error){
        console.log(error.response);
    }

}

    const fetchAllProperties = async () => {

  try {

    const token = localStorage.getItem("access");

    const response = await axios.get(
      "http://127.0.0.1:8000/all-properties/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllProperties(response.data);

  } catch (error) {
    console.log(error.response);
  }

};

    const fetchAllBookings = async () => {

    try {

        const token = localStorage.getItem("access");

        const response = await axios.get(
            "http://127.0.0.1:8000/all-bookings/",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setAllBookings(response.data);

    } catch (error) {
        console.log(error.response);
    }

};

    const fetchAllPayments = async () => {

    try {

        const token = localStorage.getItem("access");

        const response = await axios.get(
            "http://127.0.0.1:8000/all-payments/",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setAllPayments(response.data);

    } catch (error) {
        console.log(error.response);
    }

};

      const fetchAllReviews = async () => {

    try {

        const token = localStorage.getItem("access");

        const response = await axios.get(
            "http://127.0.0.1:8000/all-reviews/",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        setAllReviews(response.data);

    }

    catch(error){
        console.log(error.response);
    }

};

    const handleAddProperty = async (e) => {
  e.preventDefault();

  if (
    propertyData.price <= 0 ||
    propertyData.bedrooms <= 0 ||
    propertyData.bathrooms <= 0 ||
    propertyData.beds <= 0 ||
    propertyData.max_guests <= 0
  ) {
    alert("All numeric values must be greater than 0.");
    return;
  }

  try {
    const token = localStorage.getItem("access");

    const response = await axios.post(
      "http://127.0.0.1:8000/properties/",
      propertyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Property Added Successfully");

    console.log(response.data);

    fetchMyProperties(); // list refresh

    setPropertyData({
      title: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      property_type: "",
      max_guests: "",
      beds: ""
    });

  } catch (error) {
    console.log(error.response);
  }
};

      const fetchPendingSubscriptions = async () => {

  try {

    const token = localStorage.getItem("access");

    const response = await axios.get(
      "http://127.0.0.1:8000/pending-subscriptions/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPendingSubscriptions(response.data);

  } catch (error) {

    console.log(error.response);

  }

};

      const handleApprove = async (id) => {

  try {

    const token = localStorage.getItem("access");

    await axios.put(
      `http://127.0.0.1:8000/approve-subscription/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Subscription Approved Successfully");

    fetchPendingSubscriptions();

  } catch (error) {

    console.log(error.response);

    alert("Unable to approve subscription.");

  }

};

      const handleReject = async (id) => {

  try {

    const token = localStorage.getItem("access");

    await axios.put(
      `http://127.0.0.1:8000/reject-subscription/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Subscription Rejected");

    fetchPendingSubscriptions();

  } catch (error) {

    console.log(error.response);

    alert("Unable to reject subscription.");

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

                <form className="add-property-form" onSubmit={handleAddProperty}>

                <label>Property Title</label>
                <input type="text" placeholder="Enter property title" name="title"
  value={propertyData.title}
  onChange={handleChange} required/>

                <label>Location</label>
                <input type="text" placeholder="Enter location" name="location"
  value={propertyData.location}
  onChange={handleChange} required/>

                <label>Price Per Night</label>
                <input type="number" placeholder="Enter price" name="price"
  value={propertyData.price}
  onChange={handleChange} min="1" required/>

                <label>Property Type</label>
                <select value={propertyData.property_type}
  onChange={handleChange} required name="property_type">
                    <option value="" disabled>Select Property Type</option>
                    <option value="room">Room</option>
                    <option value="flat">Flat</option>
                    <option value="hotel">Hotel</option>
                    <option value="resort">Resort</option>
                    <option value="bungalow">Bungalow</option>
                </select>

                <label>Bedrooms</label>
                <input type="number" name='bedrooms' placeholder="Enter bedrooms"  value={propertyData.bedrooms}
  onChange={handleChange} min="1" required/>

                <label>Bathrooms</label>
                <input type="number" name='bathrooms' placeholder="Enter bathrooms"  value={propertyData.bathrooms}
  onChange={handleChange} min="1" required/>

                <label>Beds</label>
                <input type="number" name='beds' placeholder="Enter beds"  value={propertyData.beds}
  onChange={handleChange} min="1" required/>

                <label>Max Guests</label>
                <input type="number" name='max_guests' placeholder="Enter max guests"  value={propertyData.max_guests}
  onChange={handleChange} min="1" required/>

                <label>Description</label>
                <textarea
                    rows="5" name='description'
                    placeholder="Enter property description"
                     value={propertyData.description}
  onChange={handleChange} required
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

    <form
      className="property-image-form"
      onSubmit={handleUploadImage}
    >

      <label>Select Property</label>

      <select
        name="property"
        value={imageData.property}
        onChange={handleImageChange}
        required
      >
        <option value="">
          Select Property
        </option>

        {myProperties.map((property) => (
          <option
            key={property.id}
            value={property.id}
          >
            {property.title}
          </option>
        ))}
      </select>

      <label>Upload Image</label>

      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        required
      />

      <label>Image Type</label>

      <select
        name="image_type"
        value={imageData.image_type}
        onChange={handleImageChange}
        required
      >
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

            {
activeTab === "Show Hosts" && (

<div className="profile-section">

<h2>All Hosts</h2>

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

{hosts.length === 0 ? (

<tr>
<td colSpan="5">No Hosts Found</td>
</tr>

) : (

hosts.map((host) => (

<tr key={host.id}>
<td>{host.name}</td>
<td>{host.email}</td>
<td>{host.phone}</td>
<td>{host.role}</td>
<td>{host.host_status}</td>
</tr>

))

)}

</tbody>

</table>

</div>

)
}

{
activeTab === "Subscription Approval" && (

<div className="profile-section">

<h2>Pending Subscription Requests</h2>

<table className="users-table">

<thead>

<tr>

<th>Name</th>
<th>Email</th>
<th>Plan</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{
pendingSubscriptions.length === 0 ?

<tr>

<td colSpan="5">
No Pending Requests
</td>

</tr>

:

pendingSubscriptions.map((subscription) => (

<tr key={subscription.id}>

<td>{subscription.user_name}</td>

<td>{subscription.user_email}</td>

<td>{subscription.plan_name}</td>

<td>{subscription.approval_status}</td>

<td>

<button
className="approve-btn"
onClick={() => handleApprove(subscription.id)}
>
Approve
</button>

<button
className="reject-btn"
onClick={() => handleReject(subscription.id)}
>
Reject
</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

)
}

            {
            activeTab === "Show All Properties" && (

            <div className="host-properties-container">

            {
            allProperties.length === 0 ?

            <div className="no-data">

            <h3>No Properties Found</h3>

            </div>

            :

            allProperties.map((property) => (

            <div
            className="host-property-card"
            key={property.id}
            >

            <h3>{property.title}</h3>

            <p>
            📍 {property.location}
            </p>

            <p>
            <strong>Property Type:</strong>
            {" "}
            {property.property_type}
            </p>

            <p>
            <strong>Price:</strong>
            ₹{property.price}
            </p>

            <p>
            <strong>Bedrooms:</strong>
            {" "}
            {property.bedrooms}
            </p>

            <p>
            <strong>Bathrooms:</strong>
            {" "}
            {property.bathrooms}
            </p>

            <p>
            <strong>Beds:</strong>
            {" "}
            {property.beds}
            </p>

            <p>
            <strong>Max Guests:</strong>
            {" "}
            {property.max_guests}
            </p>

            <p>
            <strong>Host:</strong>
            {" "}
            {property.host_name}
            </p>

            <p>
            <strong>Added On:</strong>
            {" "}
            {new Date(property.created_at).toLocaleDateString("en-GB")}
            </p>

            <div className="property-action-buttons">

            <button className="view-property-btn">
            View
            </button>

            <button className="delete-property-btn">
            Delete
            </button>

            </div>

            </div>

            ))

            }

</div>

)
}

            {
activeTab === "Show All Bookings" && (

<div className="host-bookings-container">

{
allBookings.length === 0 ?

<div className="no-data">

<h3>No Bookings Found</h3>

</div>

:

allBookings.map((booking) => (

<div
className="host-booking-card"
key={booking.id}
>

<h3>{booking.property_title}</h3>

<p>
<strong>Booked By:</strong> {booking.user_name}
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

}

</div>

)
}

            {
activeTab === "All Payment History" && (

<>
<h2>All Payment History</h2>

<div className="payment-container">

{
allPayments.length === 0 ?

<div className="no-data">

<h3>No Payment History Found</h3>

</div>

:

allPayments.map((payment) => (

<div
className="admin-payment-card"
key={payment.id}
>

<h3>{payment.property_title}</h3>

<p>
<strong>User:</strong> {payment.user_name}
</p>

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
<strong>Payment ID:</strong> {payment.razorpay_payment_id || "-"}
</p>

<p>
<strong>Paid On:</strong>{" "}
{
payment.paid_at
? new Date(payment.paid_at).toLocaleDateString("en-GB")
: "-"
}
</p>

</div>

))

}

</div>

</>

)
}

                {
activeTab === "Show All Reviews" && (

<>
<h2>All Reviews</h2>

<div className="host-reviews-container">

{
allReviews.length === 0 ?

<div className="no-data">

<h3>No Reviews Found</h3>

</div>

:

allReviews.map((review)=>(

<div
className="host-review-card"
key={review.id}
>

<h3>{review.property_title}</h3>

<p>
<strong>Location:</strong> {review.property_location}
</p>

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

}

</div>

</>

)
}
        </div>

      </div>

    </div>
  );
};

export default UserProfile;