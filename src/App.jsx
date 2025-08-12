import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { me } from "./api/authApi";
import { AuthProvider, useAuth } from "./context/AuthContext";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Loader from "./pages/common/Loader";


import Home from "./pages/customer/Home/index";
import Login from "./pages/components/Login/index";
import Signup from "./pages/components/Signup/index";
import Header from "./pages/common/Header/Header";
import Footer from "./pages/common/Footer";
import Reservation from "./pages/customer/Reservation/index";
import ContactUs from "./pages/customer/ContactUs/index";
import AboutUs from "./pages/customer/AboutUs/index";
import Menu from "./pages/customer/Menu/index";
import ForgotPassword from "./pages/components/ForgotPassword/ForgotPassword";
import Profile from './pages/components/Profile/index';
import Cart from './pages/customer/Cart/CartPage';
import MyOrders from './pages/customer/MyOrders/index';
import Checkout from './pages/customer/Checkout/index';
import PageNotFound from "./pages/common/NotFound";
import Gallery from "./pages/customer/Gallery/index";
// Layouts
import PublicLayout from "./pages/layouts/PublicLayout";
import AdminLayout from "./pages/layouts/AdminLayout";

// Admin Page
import AdminDashboard from './pages/admin/Dashboard/index';
import AddTakeawayItem  from './pages/admin/AddTakeawayItem/index';
import AddDiningItem from './pages/admin/AddDiningItem/index';
import AddDrinksItem from './pages/admin/AddDrinksItem/index';
import ManageTakeawayItem from './pages/admin/ManageTakeawayItem/index';
import ManageUsers from './pages/admin/ManageUsers/index';
import AddGalleryItem from './pages/admin/AddGalleryItem/index';


// Guards
import AdminGuard from './guard/AdminGuard'
import CustomerGuard from './guard/CustomerGuard'
import TimeRestrictedGuard from './guard/TimeRestrictedGuard'

function AppLayout() {
  const { user, role, loading, setUser, setRole } = useAuth();
  console.log('role:', role);


// useEffect(() => {
//   const fetchUser = async () => {
//     const currentUser = await me();
//     if (currentUser) {
//       setUser(currentUser);
//       setRole(currentUser.role || "guest");
//     }
//   };

//   // Only fetch user if not already set (avoid calling if guest)
//   if (!user || role === "guest") {
//     fetchUser();
//   }
// }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={  <Home /> }></Route>
          <Route path="/reservation" element={<Reservation />}></Route>
          <Route path="/menu" element={ <Menu />}></Route>
          <Route path="/about_us" element={<AboutUs />}></Route>
          <Route path="/contact_us" element={<ContactUs />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/cart" element={ <CustomerGuard> <Cart /> </CustomerGuard>}></Route>
          <Route path="/my_orders" element={<CustomerGuard> <MyOrders /> </CustomerGuard>}></Route>
          <Route path="/checkout" element={
                <CustomerGuard>
                <TimeRestrictedGuard>                  
                    <Checkout />
                </TimeRestrictedGuard>
                </CustomerGuard>
          } />

          <Route path="/gallery" element={<Gallery />}></Route>

          </Route>
          
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot_password" element={<ForgotPassword />}></Route>
        {/* Not found page */}
        <Route path="*" element={<PageNotFound />} />

      {/* Admin Routes with Sidebar */}
        <Route element={<AdminGuard> <AdminLayout /> </AdminGuard>}>
          <Route path="/admin/dashboard" element={<AdminDashboard /> } />
          <Route path="/admin/Takeaway/add" element={<AddTakeawayItem  /> }></Route>
          <Route path="/admin/Dining/add" element={<AddDiningItem  /> }></Route>
          <Route path="/admin/Drinks/add" element={<AddDrinksItem  /> }></Route>
          <Route path="/admin/Takeaway/manage" element={<ManageTakeawayItem  /> }></Route>
          <Route path="/admin/ManageUsers" element={<ManageUsers  /> }></Route>
          <Route path="/admin/Gallery/add" element={<AddGalleryItem  /> }></Route>
        </Route>

      </Routes>

    </>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
