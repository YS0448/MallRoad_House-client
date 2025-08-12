import React, { useState } from "react";
import SignupForm from "./SignupForm.jsx";
import "../../../assets/styles/components/Signup/Signup.css";
import { Link } from "react-router-dom";
import { Toast } from '../../common/AlertService.jsx';
const Signup = () => {
  return (
    <>
    <Toast/>
       <div className="signup-container">
        <div className="login-home-link">
          <Link to="/" className="home-link">
            ⬅ Back to Home
          </Link>
        </div>
        <div className="signup-card">
        <h2 className="signup-title">Sign up</h2>
        <SignupForm />
      </div>
    </div>
    </>
  );
};

export default Signup;
