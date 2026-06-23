import React from 'react';
import '../App.css';

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register Here</h2>

        <form method="post">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name"/>

          <label>Email</label>
          <input type="email" placeholder="Enter your email"/>

          <label>Phone Number</label>
          <input type="tel" placeholder="Enter phone number"/>

          <label>Password</label>
          <input type="password" placeholder="Enter password"/>

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm password"/>

          <button type="submit">Create Account</button>
        </form>

        <p className="login-text">
          Already have an account?{' '}
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;