import React, { useState } from "react";
import LoginInput from "./LoginInput";
import { Link, useNavigate } from "react-router-dom";
import apiCall from "../../../api/apiCall";
import {useAuth} from '../../../context/AuthContext';
import {me} from '../../../api/authApi';
import { showToast } from "../../common/AlertService";

const LoginForm = () => {
  const { setUser, setRole } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await apiCall("POST", "/auth/login", formData);
      console.log("Login successful:", response);
      
      // redirect or store token here
      if (response.status === 200) {
      const obj = {
        user: response?.data.user,
        token: response?.data.token,
      }; 
        // localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user-cred", JSON.stringify(obj));

        // Redirect to home or dashboard
        const currentUser = await me();
        console.log('currentUser:', currentUser);
      if (currentUser) {
        console.log('currentUser:', currentUser);
        setUser(currentUser);
        setRole(currentUser.role);
      }
      if(currentUser.role==="admin"){
        navigate("/admin/dashboard");
      }else{
        navigate("/");
      }
      }
    } catch (error) {
      console.error("error:", error);
      localStorage.removeItem("authToken")
      localStorage.removeItem("user-cred")
      // setServerError(
      //   error.response?.data?.message || "Login failed. Try again."
      // );
      showToast('error',error.message || 'Login failed. Try again.');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
        error={errors.email}
      />

      <LoginInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="●●●●●●●"
        error={errors.password}
        showToggle={true}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />

      {serverError && (
        <div className="error-message text-center">{serverError}</div>
      )}

      <button className="login-btn"  type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <div className="forgot-password-link">
        <Link to="/forgot_password">Forgot Password?</Link>
      </div>

      <div className="login-or">or</div>

      <div className="text-center">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </div>
    </form>
  );
};

export default LoginForm;
