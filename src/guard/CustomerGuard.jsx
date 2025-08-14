// src/components/AuthGuard.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const CustomerGuard = ({ children }) => {

  const { role } = useAuth();
  if (role !== 'customer' ) {
    const landingPage = role === 'admin'? '/admin/dashboard' : '/';
    return <Navigate to={landingPage} replace />;
  }

  return <Outlet />;
};

export default CustomerGuard;
