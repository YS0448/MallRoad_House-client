import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../../assets/media/image/not_found.jpg"; // Update the path to your image
import {useAuth} from '../../context/AuthContext';
const NotFound = () => {
  const { role } = useAuth();
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <img
        src={notFoundImg}
        alt="404 Not Found"
        style={{ maxWidth: "300px", marginBottom: "2rem" }}
      />
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Oops! Page Not Found</h2>
      <p className="mb-4 text-muted">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      {role === "admin" ? (
        <Link to="/admin/dashboard" className="btn btn-primary btn-lg">
          Go to Home
        </Link>
      ):(
      <Link to="/" className="btn btn-primary btn-lg">
          Go to Home
        </Link>
      )}
      
    </div>
  );
};

export default NotFound;
