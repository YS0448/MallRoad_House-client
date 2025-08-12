// src/pages/layouts/AdminLayout.jsx
import React,{useState, useRef, useEffect} from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Sidebar from "../common/Sidebar/Sidebar"; // your sidebar component
import { useAuth } from "../../context/AuthContext";
import Footer from '../common/Footer';

const AdminLayout = () => {
  const { role } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Initialize from localStorage on first render
    const saved = localStorage.getItem("sidebarCollapsed");
      return saved !== null ? saved === "true" : true; // default to true
  });

  
  const sidebarRef = useRef();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !isCollapsed
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCollapsed]);

  const toggleSidebar = () => {
    const updated = !isCollapsed;
    setIsCollapsed(updated);
    localStorage.setItem("sidebarCollapsed", updated.toString());
    localStorage.removeItem("sidebarToggle");
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div ref={sidebarRef}>
        {role === "admin" && <Sidebar collapsed={isCollapsed} toggleSidebar={toggleSidebar} />}
      </div>
      <main className={`main-content `}>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default AdminLayout;
