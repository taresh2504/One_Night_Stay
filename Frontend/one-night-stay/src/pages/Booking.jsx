import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const Booking = () => {

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [bookingData, setBookingData] = useState({
    property: id,
    check_in: "",
    check_out: "",
    guests_count: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {

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

      } catch (error) {

        console.log(error);

      }

    };

    fetchProperty();

  }, [id]);

  const handleBookingChange = (e) => {

    setBookingData({

      ...bookingData,

      [e.target.name]:
        e.target.name === "guests_count"
          ? Number(e.target.value)
          : e.target.value,

    });

  };

  const handleBooking = async () => {

  try {

    const token = localStorage.getItem("access");

    // Create Order
    const orderResponse = await axios.post(

      "http://127.0.0.1:8000/payment/create-order/",

      bookingData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    const order = orderResponse.data;

    const options = {

      key: order.key,

      amount: order.amount,

      currency: order.currency,

      name: "One Night Stay",

      description: "Hotel Booking Payment",

      order_id: order.order_id,

      handler: async function (response) {

        try {

          await axios.post(

            "http://127.0.0.1:8000/payment/verify/",

            {

              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

            },

            {

              headers: {

                Authorization: `Bearer ${token}`,

              },

            }

          );

          alert("Payment Successful 🎉");

          navigate("/profile");

        }

        catch (err) {

          console.log(err);

          alert("Payment verification failed.");

        }

      },

      prefill: {

        name: "",

        email: "",

      },

      theme: {

        color: "#0d6efd",

      },

    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  }

  catch (error) {

    console.log(error);

    if (error.response?.data) {

      alert(JSON.stringify(error.response.data));

    }

    else {

      alert("Something went wrong.");

    }

  }

};

  const nights =
  bookingData.check_in && bookingData.check_out
    ? Math.max(
        0,
        (new Date(bookingData.check_out) -
          new Date(bookingData.check_in)) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

const totalPrice = nights * (property?.price || 0);

  if (!property) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="booking-container">

      <div className="booking-card">

        <h1>Booking Page</h1>

        <h2>{property.title}</h2>

        <p>📍 {property.location}</p>

        <h3>₹{property.price} / Night</h3>

        <form>

          <label>Check In Date</label>

          <input
            type="date"
            name="check_in"
            value={bookingData.check_in}
            onChange={handleBookingChange}
          />

          <label>Check Out Date</label>

          <input
            type="date"
            name="check_out"
            value={bookingData.check_out}
            onChange={handleBookingChange}
          />

          <label>Guests</label>

          <input
            type="number"
            min="1"
            name="guests_count"max={property.max_guests}
            value={bookingData.guests_count}
            onChange={handleBookingChange}
          />
          <p>Maximum Guests Allowed: {property.max_guests}</p>

          <div className="total-price">

            <h2>Total Price: ₹{totalPrice}</h2>

            <p>
  {nights} Night{nights !== 1 ? "s" : ""}
</p>

          </div>

          <button
            type="button"
            className="confirm-btn"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>

        </form>

      </div>

    </div>

  );

};

export default Booking;