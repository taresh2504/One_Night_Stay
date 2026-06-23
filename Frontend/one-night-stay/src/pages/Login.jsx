import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form method="post">
          <label>Email</label>
          <input type="email" name='email' placeholder="Enter your email"/>

          <label>Password</label>
          <input type="password" name='password' placeholder="Enter your password"/>

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