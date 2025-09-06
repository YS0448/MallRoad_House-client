import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/styles/components/common/Sidebar.css";
import { useAuth } from "../../../context/AuthContext";
import { FaTachometerAlt, FaUsers, FaImages } from "react-icons/fa";
import { AiFillProduct, AiOutlineLogout } from "react-icons/ai";
import LogoutModal from "../LogoutModal";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const { setUser, setRole } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole("guest");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay (for mobile view) */}
      {!collapsed && <div className="sidebar__overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button className="sidebar__close-btn" onClick={toggleSidebar}>
          ✕
        </button>

        <h4 className="sidebar__title">Admin Panel</h4>

        <ul className="sidebar__nav nav flex-column">
          <li className="nav-item">
            <Link to="/admin/dashboard" className="sidebar__link nav-link">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/ManageUsers" className="sidebar__link nav-link">
              <FaUsers />
              <span>Users</span>
            </Link>
          </li>

          {/* Gallery */}
          <li className="nav-item dropdown">
            <Link
              to="#"
              className="sidebar__link nav-link dropdown-toggle"
              id="galleryDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaImages />
              <span>Gallery</span>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="galleryDropdown">
              <li>
                <Link to="/admin/Gallery/add" className="dropdown-item">
                  Add Gallery Item
                </Link>
              </li>
            </ul>
          </li>

          {/* Menu */}
          <li className="nav-item dropdown">
            <Link
              to="#"
              className="sidebar__link nav-link dropdown-toggle"
              id="menuDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <AiFillProduct />
              <span>Menu</span>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="menuDropdown">
              <li className="fw-bold px-2">Add Items</li>
              <li>
                <Link to="/admin/takeaway/add" className="dropdown-item">
                  Add Takeaway Item
                </Link>
              </li>
              <li>
                <Link to="/admin/dining/add" className="dropdown-item">
                  Add Dining Item
                </Link>
              </li>
              <li>
                <Link to="/admin/drinks/add" className="dropdown-item">
                  Add Drinks Item
                </Link>
              </li>
              <li>
                <Link to="/admin/set_meal/add" className="dropdown-item">
                  Set Meal
                </Link>
              </li>
              <li><hr /></li>
              <li className="fw-bold px-2">Manage Items</li>
              <li>
                <Link to="/admin/takeaway/manage" className="dropdown-item">
                  Manage Takeaway Items
                </Link>
              </li>
            </ul>
          </li>

          {/* Logout */}
          <li>
            <div
              className="sidebar__link nav-link"
              onClick={() => setShowLogoutModal(true)}
              style={{ cursor: "pointer" }}
            >
              <AiOutlineLogout />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </aside>

      {/* Logout Modal */}
      <LogoutModal
        show={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Sidebar;
