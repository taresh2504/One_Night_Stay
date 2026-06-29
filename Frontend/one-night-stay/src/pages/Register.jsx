import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErrors({});

    try {

      await axios.post(
        "http://127.0.0.1:8000/register/",
        formData
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      if (error.response) {

        setErrors(error.response.data);

      } else {

        alert("Server Error");

      }

    }

  };

  return (

    <div className="container-fluid register-container d-flex align-items-center justify-content-center py-5">

      <div
        className="register-box shadow-lg bg-white rounded p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >

        <h2 className="register-title text-center mb-4">
          Register Here
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <div className="text-danger mt-1">
                {errors.name[0]}
              </div>
            )}

          </div>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <div className="text-danger mt-1">
                {errors.email[0]}
              </div>
            )}

          </div>

          <div className="mb-3">

            <label className="form-label">
              Phone Number
            </label>

            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <div className="text-danger mt-1">
                {errors.phone[0]}
              </div>
            )}

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <div className="text-danger mt-1">
                {errors.password[0]}
              </div>
            )}

          </div>

          <div className="mb-3">

            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              name="cpassword"
              placeholder="Confirm password"
              value={formData.cpassword}
              onChange={handleChange}
            />

            {errors.cpassword && (
              <div className="text-danger mt-1">
                {Array.isArray(errors.cpassword)
                  ? errors.cpassword[0]
                  : errors.cpassword}
              </div>
            )}

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
          >
            Create Account
          </button>

        </form>

        <p className="login-text text-center mt-4">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

};

export default Register;