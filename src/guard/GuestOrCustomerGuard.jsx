// src/components/AuthGuard.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const GuestOrCustomerGuard = ({ children }) => {
    const { role } = useAuth();
  if (role !== 'guest' && role !== 'customer') {
    const landingPage = role === 'admin'? '/admin/dashboard' : '/';
    return <Navigate to={landingPage} replace />;
  }

  // return children;
  return <Outlet/>;
};

export default GuestOrCustomerGuard;
