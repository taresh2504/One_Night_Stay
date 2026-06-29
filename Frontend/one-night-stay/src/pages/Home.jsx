import React, { useEffect, useState } from "react";
import axios from "axios";
import Homesearch from "../components/Homesearch";
import Propertycard from "../components/Propertycard";
import { FaArrowRightLong } from "react-icons/fa6";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [hotels, setHotels] = useState([]);
  const [resorts, setResorts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = () => {

    if (search.trim() === "") {
      navigate("/properties");
    } else {
      navigate(`/properties?search=${search}`);
    }

  };

  const fetchProperties = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/properties/"
      );

      setHotels(

        response.data.filter(
          (item) =>
            item.property_type?.toLowerCase() === "hotel"
        )

      );

      setResorts(

        response.data.filter(
          (item) =>
            item.property_type?.toLowerCase() === "resort"
        )

      );

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <>

      <Homesearch
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <br />
      <br />

      <div className="container-fluid">

        <h1 className="section-title mb-4">
          Explore Hotels <FaArrowRightLong />
        </h1>

        <div className="row g-4 justify-content-center">

          {

            hotels.map((hotel) => (

              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
                key={hotel.id}
              >

                <Propertycard property={hotel} />

              </div>

            ))

          }

        </div>

      </div>

      <br />
      <br />

      <div className="container-fluid">

        <h1 className="section-title mb-4">
          Discover Resorts <FaArrowRightLong />
        </h1>

        <div className="row g-4 justify-content-center">

          {

            resorts.map((resort) => (

              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
                key={resort.id}
              >

                <Propertycard property={resort} />

              </div>

            ))

          }

        </div>

      </div>

      <br />
      <br />

      <section className="why-us">

        <div className="container">

          <h2 className="text-center mb-5">
            Why Choose One Night Stay?
          </h2>

          <div className="row g-4">

            <div className="col-lg-3 col-md-6 col-sm-6 col-12">

              <div className="why-card h-100">

                🏨

                <h3>Verified Properties</h3>

                <p>
                  Only trusted hotels and resorts.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12">

              <div className="why-card h-100">

                💳

                <h3>Secure Payments</h3>

                <p>
                  100% secure payment with Razorpay.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12">

              <div className="why-card h-100">

                ⭐

                <h3>Trusted Reviews</h3>

                <p>
                  Real ratings from genuine guests.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12">

              <div className="why-card h-100">

                📞

                <h3>Easy Booking</h3>

                <p>
                  Book your stay in just a few clicks.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <br />
      <br />

    </>

  );

};

export default Home;