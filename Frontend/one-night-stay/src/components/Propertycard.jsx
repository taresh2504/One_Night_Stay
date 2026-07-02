import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/One_Night_Stay_Logo.jpg";

const Propertycard = ({ property }) => {

  const navigate = useNavigate();

  const firstImage = property?.images?.[0]?.image;

  const imageUrl =
    firstImage && firstImage.startsWith("http")
      ? firstImage
      : firstImage
      ? `https://one-night-stay.onrender.com/media/${firstImage}`
      : logo;

  return (

    <div
      className="cardholder h-100 shadow-sm"
      onClick={() => navigate(`/property/${property.id}`)}
      style={{ cursor: "pointer" }}
    >

      <div className="imagecontainer">

        <img
          src={imageUrl}
          alt={property.title}
          className="propertyimage"
        />

      </div>

      <div className="cardcontent d-flex flex-column">

        <div className="propertyname">
          {property.title}
        </div>

        <div className="propertylocation">
          {property.location}
        </div>

        <div className="wishlistcontainer mt-auto">

          <p className="propertyprice mb-0">
            ₹{property.price}
            <span> / Night</span>
          </p>

        </div>

      </div>

    </div>

  );

};

export default Propertycard;