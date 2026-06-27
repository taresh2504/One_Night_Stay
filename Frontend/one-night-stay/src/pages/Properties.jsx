import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/One_Night_Stay_Logo.jpg";
import { IoWifi } from "react-icons/io5";
import { HiOutlineTv } from "react-icons/hi2";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiCarBatteryFill } from "react-icons/pi";

const Properties = () => {

  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  const fetchProperties = async () => {

    try {

        const response = await axios.get(
            "http://127.0.0.1:8000/properties/search/",
            {
                params: {
                    search: search,
                    ordering: sort,
                },
            }
        );

        setProperties(response.data);

    } catch (error) {

        console.log(error);

    }

};

  useEffect(() => {

    fetchProperties();

}, [search, sort]);

  return (
    <>
      <div className="search-and-sortholder">

        <form>
          <input
            type="search"
            placeholder="Search Hotel, Resort, Bungalow..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            Search
          </button>
        </form>

        <br />

        <form>
          <select defaultValue="" value={sort}
        onChange={(e) => setSort(e.target.value)}>
            <option value="" disabled>
              Sort here
            </option>

            <option value="-price">Price High to Low</option>
            <option value="price">Price Low to High</option>
            <option value="title">Name A to Z</option>
            <option value="-title">Name Z to A</option>
            {/* <option>Hotels</option>
            <option>Resorts</option> */}
          </select>
        </form>

      </div>

      <br />

      {properties.map((property) => (

        <div className="properties-card" key={property.id}>

          <div className="photo-section">

            {/* Main Image */}

            <div className="main-photo">

              <img
                src={
                  property.images?.length > 0
                    ? `https://res.cloudinary.com/dnjvp8b90/${property.images[0].image}`
                    : logo
                }
                alt={property.title}
              />

            </div>

            {/* Side Images */}

            <div className="sub-photo">

              {property.images?.slice(1, 4).map((img) => (

                <img
                  key={img.id}
                  src={`https://res.cloudinary.com/dnjvp8b90/${img.image}`}
                  alt={img.image_type}
                />

              ))}

            </div>

          </div>

          <div className="detail">

            <h1>{property.title}</h1>

            <h3>📍 {property.location}</h3>

            <br />

            <div className="facility">

              <p><IoWifi /> Free Wi-Fi</p>
              <p><HiOutlineTv /> T.V Available</p>
              <p><CgSmartHomeRefrigerator /> Fridge</p>
              <p><PiCarBatteryFill /> Power Backup</p>

            </div>

            <br />

            <div className="detail-end">

              <h2>₹{property.price} / Night</h2>

              <div className="detail-buttons">

                <button onClick={() => navigate(`/property/${property.id}`)}>
                  View Details
                </button>

                <button>
                  Book Now
                </button>

              </div>

            </div>

          </div>

        </div>

      ))}

    </>
  );
};

export default Properties;