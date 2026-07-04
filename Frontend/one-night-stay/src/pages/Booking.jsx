import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const Booking = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [bookingData, setBookingData] = useState({
    property: id,
    check_in: "",
    check_out: "",
    guests_count: 1,
  });

  const today = new Date().toISOString().split("T")[0];

  const getNextDate = (date) => {
  if (!date) return today;

  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);

  return nextDate.toISOString().split("T")[0];
};

  useEffect(() => {

    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(
          `https://one-night-stay.onrender.com/properties/${id}/`,
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
  const { name, value } = e.target;

  if (name === "check_in") {
    setBookingData({
      ...bookingData,
      check_in: value,
      check_out:
        bookingData.check_out && bookingData.check_out <= value
          ? ""
          : bookingData.check_out,
    });

    return;
  }

  setBookingData({
    ...bookingData,
    [name]: name === "guests_count" ? Number(value) : value,
  });
};

const handleBooking = async () => {

  if (!bookingData.check_in || !bookingData.check_out) {
    alert("Please select check-in and check-out dates.");
    return;
  }

  if (bookingData.check_out <= bookingData.check_in) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  try {

    const token = localStorage.getItem("access");

    const orderResponse = await axios.post(
      "https://one-night-stay.onrender.com/payment/create-order/",
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
            "https://one-night-stay.onrender.com/payment/verify/",
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

        } catch (err) {
          console.log(err);
          alert("Payment verification failed.");
        }
      },

      prefill: {
        name: localStorage.getItem("name") || "",
        email: localStorage.getItem("email") || "",
      },

      theme: {
        color: "#0d6efd",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {

    console.log(error);

    if (error.response?.data) {
      alert(JSON.stringify(error.response.data));
    } else {
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
    return <h2 className="text-center mt-5">Loading...</h2>;
  }
    return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0 booking-card">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Booking Details</h2>
              <div className="mb-4">
                <h3>{property.title}</h3>
                <p className="text-muted mb-2">📍 {property.location}</p>
                <h4 className="text-primary">₹{property.price} / Night</h4>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Check In Date</label>
                    <input
  type="date"
  className="form-control"
  name="check_in"
  min={today}
  value={bookingData.check_in}
  onChange={handleBookingChange}
/>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Check Out Date</label>
                    <input
  type="date"
  className="form-control"
  name="check_out"
  min={getNextDate(bookingData.check_in)}
  value={bookingData.check_out}
  onChange={handleBookingChange}
  disabled={!bookingData.check_in}
/>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Guests</label>
                  <input type="number" className="form-control" min="1" max={property.max_guests} name="guests_count" value={bookingData.guests_count} onChange={handleBookingChange}/>
                  <small className="text-muted">Maximum Guests Allowed : {property.max_guests}</small>
                </div>

                <div className="card bg-light border-0 mb-4">
                  <div className="card-body">
                    <h4>Total Price : ₹{totalPrice}</h4>
                    <p className="mb-0">{nights} Night{nights !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                <button type="button" className="btn btn-primary w-100 py-2" onClick={handleBooking}>Confirm Booking</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;