// src/components/AuthGuard.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user-cred'));
  const role = user?.user?.role;
  if (!user || !user.token || role!== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminGuard;
