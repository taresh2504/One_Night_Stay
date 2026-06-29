import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import "../App.css";
import logo from "../assets/One_Night_Stay_Logo.jpg";

const Propertydetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [reviews, setReviews] = useState([]);

  const [reviewData, setReviewData] = useState({
    property: id,
    rating: "",
    comment: "",
  });

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
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      setProperty(response.data);

      if (response.data.images.length > 0) {
        setSelectedImage(response.data.images[0].image);
      }

    } catch (error) {
      console.log(error);
    }

  };

  const fetchReviews = async () => {
  try {
    const token = localStorage.getItem("access");

    const response = await axios.get(
      `http://127.0.0.1:8000/properties/${id}/reviews/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Reviews:", response.data);
    setReviews(response.data);

  } catch (error) {
    console.log("Review Error:", error.response);
  }
};

  useEffect(() => {

    fetchProperty();
    fetchReviews();

  }, []);

  if (!property) {
    return (
      <Container className="text-center mt-5">
        <h2>Please Register and Login First</h2>
      </Container>
    );
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

      alert("Property added to Wishlist.");

    } catch (error) {

      if (error.response?.data?.non_field_errors) {
        alert(error.response.data.non_field_errors[0]);
      } else {
        alert("Unable to add Property.");
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

      if (error.response?.data) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Unable to Submit Review");
      }

    }

  };
    return (
    <Container fluid className="details-container py-4">

      <Row className="g-4">

        {/* Left Side Images */}

        <Col lg={7}>

          <Card className="border-0 shadow-sm">

            <Card.Body>

              <img
                src={selectedImage || logo}
                alt={property.title}
                className="main-image img-fluid rounded"
              />

              <Row className="mt-3 g-2">

                {property.images?.map((img) => (

                  <Col xs={4} md={3} key={img.id}>

                    <img
                      src={img.image}
                      alt={img.image_type}
                      className={`gallery-image img-fluid rounded ${
                        selectedImage === img.image ? "active-image" : ""
                      }`}
                      onClick={() => setSelectedImage(img.image)}
                    />

                  </Col>

                ))}

              </Row>

            </Card.Body>

          </Card>

        </Col>

        {/* Right Side */}

        <Col lg={5}>

          <Card className="shadow-sm border-0 h-100">

            <Card.Body>

              <h2>{property.title}</h2>

              <h5 className="text-muted">
                📍 {property.location}
              </h5>

              <h3 className="text-success mt-3">
                ₹{property.price} / Night
              </h3>

              <hr />

              <p>{property.description}</p>

              <hr />

              <h4>Facilities</h4>

              <Row>

                <Col xs={6}>
                  <p>📶 Free WiFi</p>
                </Col>

                <Col xs={6}>
                  <p>📺 Smart TV</p>
                </Col>

                <Col xs={6}>
                  <p>🚗 Parking</p>
                </Col>

                <Col xs={6}>
                  <p>❄️ Air Conditioning</p>
                </Col>

                <Col xs={6}>
                  <p>🏊 Swimming Pool</p>
                </Col>

                <Col xs={6}>
                  <p>🍽 Restaurant</p>
                </Col>

              </Row>

              <hr />

              <h4>Property Information</h4>

              <Row>

                <Col xs={6}>
                  <p>
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </p>
                </Col>

                <Col xs={6}>
                  <p>
                    <strong>Bathrooms:</strong> {property.bathrooms}
                  </p>
                </Col>

                <Col xs={6}>
                  <p>
                    <strong>Beds:</strong> {property.beds}
                  </p>
                </Col>

                <Col xs={6}>
                  <p>
                    <strong>Guests:</strong> {property.max_guests}
                  </p>
                </Col>

              </Row>

              <div className="d-grid gap-2 mt-4">

                <Button
                  variant="outline-dark"
                  onClick={addToWishlist}
                >
                  Add to Wishlist
                </Button>

                <Button
                  variant="success"
                  onClick={() =>
                    navigate(`/booking/${property.id}`)
                  }
                >
                  Book Now
                </Button>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      {/* Reviews */}

      <Row className="mt-5">

        <Col lg={8}>

          <h2 className="mb-4">
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (
  <p>No Reviews Yet</p>
) : (
  reviews.map((review) => (
    <div className="review-card" key={review.id}>
      <h3>{review.user_name}</h3>

      <p>
        <strong>Rating:</strong> {"⭐".repeat(review.rating)}
      </p>

      <p>{review.comment}</p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(review.created_at).toLocaleDateString("en-GB")}
      </p>
    </div>
  ))
)}

        </Col>
                <Col lg={4}>

          <Card className="shadow-sm">

            <Card.Body>

              <h3 className="mb-4">
                Write a Review
              </h3>

              <Form onSubmit={submitReview}>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Rating
                  </Form.Label>

                  <Form.Select
                    name="rating"
                    value={reviewData.rating}
                    onChange={handleReviewChange}
                  >

                    <option value="">
                      Select Rating
                    </option>

                    <option value="1">
                      ⭐ 1
                    </option>

                    <option value="2">
                      ⭐⭐ 2
                    </option>

                    <option value="3">
                      ⭐⭐⭐ 3
                    </option>

                    <option value="4">
                      ⭐⭐⭐⭐ 4
                    </option>

                    <option value="5">
                      ⭐⭐⭐⭐⭐ 5
                    </option>

                  </Form.Select>

                </Form.Group>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Comment
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="comment"
                    value={reviewData.comment}
                    onChange={handleReviewChange}
                    placeholder="Write your review..."
                  />

                </Form.Group>

                <div className="d-grid">

                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Submit Review
                  </Button>

                </div>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>

  );

};

export default Propertydetails;