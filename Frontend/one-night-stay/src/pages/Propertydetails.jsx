import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/One_Night_Stay_Logo.jpg";

const Propertydetails = () => {

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [reviews, setReviews] = useState([]);

const [reviewData, setReviewData] = useState({
  property: id,
  rating: "",
  comment: "",
});

  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
  check_in: "",
  check_out: "",
  guests_count: 1,
});

  const handleBookingChange = (e) => {
  setBookingData({
    ...bookingData,
    [e.target.name]: e.target.value,
  });
};

  const handleReviewChange = (e) => {

  setReviewData({

    ...reviewData,

    [e.target.name]: e.target.value,

  });

};

  const fetchProperty = async () => {

    try {

        const token = localStorage.getItem("access");

        const response = await axios.get(
            `http://127.0.0.1:8000/properties/${id}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setProperty(response.data);

        if (response.data.images.length > 0) {

            setSelectedImage(
                `https://res.cloudinary.com/dnjvp8b90/${response.data.images[0].image}`
            );

        }

    } catch (error) {

        console.log(error);

    }

};

    const fetchReviews = async () => {

  try {

    const token = localStorage.getItem("access");

    const response = await axios.get(
      `http://127.0.0.1:8000/property/${id}/reviews/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setReviews(response.data);

  } catch (error) {

    console.log(error);

  }

};


  useEffect(() => {

    fetchProperty();
    fetchReviews();

}, []);

    if (!property) {

    return <h2>Loading...</h2>;

}

      const addToWishlist = async () => {

  try {

    const token = localStorage.getItem("access");

    await axios.post(
      "http://127.0.0.1:8000/wishlist/",
      {
        property: property.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Property added to wishlist.");

  } catch (error) {

    console.log(error.response);

    if (error.response?.data?.non_field_errors) {
      alert(error.response.data.non_field_errors[0]);
    } else {
      alert("Unable to add property.");
    }

  }

};

      
    const submitReview = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("access");

    await axios.post(

      "http://127.0.0.1:8000/review/",

      reviewData,

      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );

    alert("Review Submitted Successfully");

    setReviewData({

      property: id,

      rating: "",

      comment: "",

    });

    fetchReviews();

  } catch (error) {

    console.log(error);

    if (error.response?.data) {

      alert(JSON.stringify(error.response.data));

    } else {

      alert("Unable to submit review.");

    }

  }

};

  return (
    <>
      <div className="details-container">

  <div className="image-gallery">
    {/* <img src={`https://res.cloudinary.com/dnjvp8b90/${property.images?.[0]?.image}`}
  alt={property.title} className="main-image" /> */}
  <img
  src={property.images?.[0]?.image || logo}
  alt={property.title}
  className="main-image"
/>

    <div className="gallery-row">

  {property.images?.slice(1, 5).map((img) => (

    <img
      key={img.id}
      src={img.image}
      alt={img.image_type}
      onClick={() => setSelectedImage(img.image)}
    />

  ))}

</div>
  </div>

  <div className="property-info">
    <h1>{property.title}</h1>

<h3>📍 {property.location}</h3>

<h2>₹{property.price} / Night</h2>

<p>{property.description}</p>
  </div>

  <div className="amenities">
    <h2>Facilities</h2>

    <div className="facility-list">
      <p>📶 Free WiFi</p>
      <p>📺 Smart TV</p>
      <p>🚗 Parking</p>
      <p>❄️ Air Conditioning</p>
      <p>🏊 Swimming Pool</p>
      <p>🍽 Restaurant</p>
    </div>
  </div>

  <div className="property-meta">
    <h2>Property Information</h2>

    <p>Bedrooms : {property.bedrooms}</p>
<p>Bathrooms : {property.bathrooms}</p>
<p>Beds : {property.beds}</p>
<p>Guests : {property.max_guests}</p>
  </div>

  <div className="action-buttons">
    <button onClick={addToWishlist}>Add to Wishlist</button>
    <button onClick={() => navigate(`/booking/${property.id}`)}>Book Now</button>
  </div>

  {/* Customer Reviews */}

{

reviews.length === 0 ?

<p>No Reviews Yet</p>

:

reviews.map((review)=>(

<div
className="review-card"
key={review.id}
>

<h3>{review.user_name}</h3>

<p>

<strong>Rating:</strong>

{"⭐".repeat(review.rating)}

</p>

<p>{review.comment}</p>

<p>

<strong>Date:</strong>

{new Date(review.created_at).toLocaleDateString()}

</p>

</div>

))

}

{/* Write a Review */}

<div className="write-review">

  <h2>Write a Review</h2>

  <form onSubmit={submitReview}>

    <label>Rating</label>

    <select name="rating"
value={reviewData.rating}
onChange={handleReviewChange}>
      <option value="">Select Rating</option>
      <option value="1">⭐ 1</option>
      <option value="2">⭐⭐ 2</option>
      <option value="3">⭐⭐⭐ 3</option>
      <option value="4">⭐⭐⭐⭐ 4</option>
      <option value="5">⭐⭐⭐⭐⭐ 5</option>
    </select>

    <label>Comment</label>

    <textarea
      rows="5"
name="comment"
value={reviewData.comment}
onChange={handleReviewChange}
placeholder="Write your review..."
    ></textarea>

    <button type="submit">
      Submit Review
    </button>

  </form>

</div>

</div>
    </>
  )
}

export default Propertydetails
