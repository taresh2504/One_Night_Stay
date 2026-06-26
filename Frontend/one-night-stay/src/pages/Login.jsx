import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css'

const Login = () => {

  const navigate = useNavigate();

const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const [error, setError] = useState("");

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/login/",
      formData
    );

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem("role", response.data.role);
    localStorage.setItem("host_status", response.data.host_status);
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("phone", response.data.phone);
    localStorage.setItem("created_at", response.data.created_at);
    alert(response.data.message);

    if (response.data.role === "admin") {
      navigate("/profile");
    }
    else if (response.data.role === "host") {
      navigate("/");
    }
    else if (response.data.host_status === "approved") {
      navigate("/");
    }
    else {
      navigate("/subscription");
    }

  } catch (error) {
    if (error.response) {
      setError(error.response.data.message);
    } else {
      alert("Server Error");
    }
  }
};
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name='email' placeholder="Enter your email" value={formData.email}
          onChange={handleChange}/>

          <label>Password</label>
          <input type="password" name='password' placeholder="Enter your password" value={formData.password}
          onChange={handleChange}/>
            {error && (
  <p className="error">{error}</p>
)}

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don't have an account?{' '}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;