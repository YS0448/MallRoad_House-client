import React, { useState } from 'react';
import SignupInput from './SignupInput';
import { Link } from 'react-router-dom';
import apiCall from '../../../api/apiCall';
import {showToast} from '../../common/AlertService';  
const SignupForm = () => {
  const initialFormData ={
    fullName: '',
    email: '',
    password: ''
  }

  const [formData, setFormData] = useState(initialFormData);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on input change
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };
  
  const resetForm = () => {
    setFormData(initialFormData);
    setShowPassword(false);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await apiCall('POST', '/auth/signup', formData);
      console.log('response:', response);
      showToast('success',response.data.message);      
      resetForm();

    } catch (error) {
      console.error('Error during signup:', error);
      showToast('error',error.message || 'Failed to signup. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SignupInput
        label="Full name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Name"
        error={errors.fullName}
      />

      <SignupInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
        error={errors.email}
      />

      <SignupInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="●●●●●●●"
        error={errors.password}
        showToggle={true}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />

      <button className="signup-btn" type="submit">Sign up</button>
      <div className="signup-or">or</div>
      <div className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default SignupForm;
