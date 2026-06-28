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

  useEffect(() => {
    fetchProperties();
  }, []);

  // console.log(property.images);
  // console.log(property.images[0]);
  // console.log(imageUrl);

  const navigate = useNavigate();

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

      const allProperties = response.data;
      console.log(response.data);

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

    } catch (error) {

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

      <h1 className="section-title">
        &nbsp;&nbsp;&nbsp;Explore Hotels <FaArrowRightLong />
      </h1>

      <br />

      <div className="home-hotels">

  {hotels.map((hotel) => (

    <Propertycard
      key={hotel.id}
      property={hotel}
    />

  ))}

</div>

      <br />

      <h1 className="section-title">
        &nbsp;&nbsp;&nbsp;Discover Resorts <FaArrowRightLong />
      </h1>

      <br />

      <div className="home-hotels">

  {resorts.map((resort) => (

    <Propertycard
      key={resort.id}
      property={resort}
    />

  ))}

</div>

      <br />
      <br />

      <section className="why-us">

        <h2>Why Choose One Night Stay?</h2>

        <div className="why-container">

          <div className="why-card">
            🏨
            <h3>Verified Properties</h3>
            <p>Only trusted hotels and resorts.</p>
          </div>

          <div className="why-card">
            💳
            <h3>Secure Payments</h3>
            <p>100% secure payment with Razorpay.</p>
          </div>

          <div className="why-card">
            ⭐
            <h3>Trusted Reviews</h3>
            <p>Real ratings from genuine guests.</p>
          </div>

          <div className="why-card">
            📞
            <h3>Easy Booking</h3>
            <p>Book your stay in just a few clicks.</p>
          </div>

        </div>

      </section>

      <br />
      <br />

    </>
  );
};

export default Home;