// src/components/AuthGuard.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const CustomerGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user-cred'));
  const role = user?.user?.role;
  if (role !== 'customer' ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default CustomerGuard;
