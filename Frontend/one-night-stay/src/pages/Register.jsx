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
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register Here</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter your name" value={formData.name}
          onChange={handleChange}/>
            {errors.name && (
<p className="error">{errors.name[0]}</p>
)}

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" value={formData.email}
onChange={handleChange}/>
            {errors.email &&
<p className="error">{errors.email[0]}</p>}

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter phone number" value={formData.phone}
onChange={handleChange}/>
            {errors.phone &&
<p className="error">{errors.phone[0]}</p>}

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" value={formData.password}
onChange={handleChange}/>
          {errors.password &&
<p className="error">{errors.password[0]}</p>}

          <label>Confirm Password</label>
          <input type="password" name="cpassword" placeholder="Confirm password" value={formData.cpassword}
onChange={handleChange}/>
          {errors.cpassword && (
  <p className="error">
    {Array.isArray(errors.cpassword)
      ? errors.cpassword[0]
      : errors.cpassword}
  </p>
)}

          <button type="submit">Create Account</button>
        </form>

        <p className="login-text">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;