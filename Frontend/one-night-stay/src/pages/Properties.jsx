import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../App.css";
import logo from "../assets/One_Night_Stay_Logo.jpg";
import { IoWifi } from "react-icons/io5";
import { HiOutlineTv } from "react-icons/hi2";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiCarBatteryFill } from "react-icons/pi";

const Properties = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [sort, setSort] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const fetchProperties = async () => {

    try {

      const response = await axios.get(
        "https://one-night-stay.onrender.com/properties/search/",
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

      <div className="container-fluid py-4">

        <div className="row justify-content-center">

          <div className="col-lg-11">

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3 mb-4">

              <form
                className="d-flex w-100"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchProperties();
                }}
              >

                <input
                  type="search"
                  className="form-control me-2"
                  placeholder="Search Hotel, Resort, Bungalow..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button
                  className="btn btn-dark"
                  type="submit"
                >
                  Search
                </button>

              </form>

              <select
                className="form-select"
                style={{ maxWidth: "250px" }}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >

                <option value="">
                  Sort Here
                </option>

                <option value="-price">
                  Price High to Low
                </option>

                <option value="price">
                  Price Low to High
                </option>

                <option value="title">
                  Name A to Z
                </option>

                <option value="-title">
                  Name Z to A
                </option>

              </select>

            </div>

            <div className="row g-4">

              {properties.map((property) => (
                                <div
                  className="col-12"
                  key={property.id}
                >

                  <div className="card shadow-sm property-card-bs">

                    <div className="row g-0">

                      {/* Images */}

                      <div className="col-lg-5">

                        <div className="p-3">

                          <div className="mb-2">

                            <img
                              src={
                                property.images?.length > 0
                                  ? property.images[0].image
                                  : logo
                              }
                              alt={property.title}
                              className="property-main-image"
                              style={{
                                height: "300px",
                                objectFit: "cover",
                              }}
                            />

                          </div>

                          <div className="row g-2">

                            {property.images?.slice(1, 4).map((img) => (

                              <div
                                className="col-4"
                                key={img.id}
                              >

                                <img
                                  src={img.image}
                                  alt={img.image_type}
                                  className="property-small-image"
                                  style={{
                                    height: "90px",
                                    objectFit: "cover",
                                  }}
                                />

                              </div>

                            ))}

                          </div>

                        </div>

                      </div>

                      {/* Details */}

                      <div className="col-lg-7">

                        <div className="card-body d-flex flex-column h-100">

                          <h2 className="property-title">
                            {property.title}
                          </h2>

                          <h5 className="property-location">
                            📍 {property.location}
                          </h5>

                          <div className="row mb-4 property-facility">

                            <div className="col-md-6">

                              <p>
                                <IoWifi /> Free Wi-Fi
                              </p>

                              <p>
                                <HiOutlineTv /> TV Available
                              </p>

                            </div>

                            <div className="col-md-6">

                              <p>
                                <CgSmartHomeRefrigerator /> Fridge
                              </p>

                              <p>
                                <PiCarBatteryFill /> Power Backup
                              </p>

                            </div>

                          </div>

                          <div className="mt-auto d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

                            <h3 className="property-price">
                              ₹{property.price}
                              <span className="fs-5 text-secondary">
                                {" "}
                                / Night
                              </span>
                            </h3>

                            <div className="property-btns d-flex gap-2">
                              <button
                                className="btn btn-dark"
                                onClick={() =>
                                  navigate(`/property/${property.id}`)
                                }
                              >
                                View Details
                              </button>

                              <button
                                className="btn btn-success"
                                onClick={() =>
                                  navigate(`/booking/${property.id}`)
                                }
                              >
                                Book Now
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </>
  );
};

export default Properties;