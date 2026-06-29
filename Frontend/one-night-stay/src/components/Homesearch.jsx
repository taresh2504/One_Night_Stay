import React from "react";
import "../App.css";
import hotelinterior from "../assets/hotelinterior.mp4";

const Homesearch = ({
  search,
  setSearch,
  handleSearch,
}) => {
  return (
    <div className="srchhomeholder">

      <video
        src={hotelinterior}
        autoPlay
        muted
        loop
        playsInline
        className="hotelvideo"
      ></video>

      <div className="overlay"></div>

      <div className="container h-100">

        <div className="row h-100 align-items-center justify-content-center">

          <div className="col-lg-8 col-md-10 col-12">

            <div className="searchbox text-center">

              <h1>Find Your Perfect Stay</h1>

              <div className="searchbar row g-2 justify-content-center">

                <div className="col-md-9 col-12">

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search Hotels, Resorts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                </div>

                <div className="col-md-3 col-12">

                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSearch}
                  >
                    Search
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Homesearch;