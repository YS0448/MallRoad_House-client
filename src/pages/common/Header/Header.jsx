import React, { useEffect, useState } from "react";
import "../../../assets/styles/components/common/Header.css";
import NavbarBrandLogo from "./NavbarBrandLogo";
import NavbarLinks from "./NavbarLinks";
import UserMenu from "./UserMenu";
import {useAuth} from '../../../context/AuthContext';

// Header.jsx
const Header = ({ toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const { user, setUser, role, setRole } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header shadow-sm ps-md-5 ps-3 pe-3 ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid p-0">

          {role === "admin" && (
            <button
              className="btn  me-3 toggle_icon"
              onClick={toggleSidebar}
            >
              ☰                 
            </button>                        
          )}

          <NavbarBrandLogo />
          
            {(role === "customer" || role === "guest") && (
              <>
                <button
                className="navbar-toggler toggle_icon"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                ☰
                {/* <span className="navbar-toggler-icon"></span> */}
              </button>
              </>
            )}
            
              
              <div className="collapse navbar-collapse text-center " id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <NavbarLinks role={role} />
                  
                  <UserMenu 
                    setUser={setUser}
                    setRole={setRole}
                    role={role}
                  />

                </ul>
              </div>
            
          
        </div>
        
      </nav>
    </header>
  );
};


export default Header;
