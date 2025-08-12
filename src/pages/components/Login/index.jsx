import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import "../../../assets/styles/components/Login/Login.css";
import { Toast } from "../../common/AlertService";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const {role} = useAuth();
  let homeLink = role === "admin"? "/admin/dashboard" : "/"; 
  return (
    
    <>
      <div className="login-container">
        <div className="login-home-link">
          <Link to={homeLink} className="home-link">
            ⬅ Back to Home
          </Link>
        </div>

        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <LoginForm />
        </div>
      </div>
      <Toast />
    </>
  );
};

export default Login;
