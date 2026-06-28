import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/One_Night_Stay_Logo.jpg";

const Propertycard = ({ property }) => {

  const navigate = useNavigate();

  const imageUrl =
  property.images?.length > 0
    ? property.images[0].image.startsWith("http")
      ? property.images[0].image
      : `http://127.0.0.1:8000/media/${property.images[0].image}`
    : logo;

  console.log(property.images);
  console.log(property.images[0]);
  console.log(imageUrl);    

  return (

    <div
      className="cardholder"
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

      <div className="cardcontent">

        <div className="propertyname">
          {property.title}
        </div>

        <div className="propertylocation">
          {property.location}
        </div>

        <div className="wishlistcontainer">

          <p className="propertyprice">
            ₹{property.price}
            <span> / Night</span>
          </p>

          {/* <button
            className="wishlistbutton"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Wishlist
          </button> */}

        </div>

      </div>

    </div>

  );

};

export default Propertycard;