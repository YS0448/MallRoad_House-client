import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../../../assets/styles/components/common/Sidebar.css";
import "../../../assets/styles/components/common/Sidebar.css";
import { useAuth } from "../../../context/AuthContext";
import { FaTachometerAlt, FaUsers, FaCog } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";

// Sidebar.jsx
const Sidebar = ({ collapsed, toggleSidebar }) => {
  const { user, setUser, role, setRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole("guest");
    navigate("/login");
  };

  return (
    <div className={`sidebar text-white ${collapsed ? "collapsed" : ""} `}>
      <button className="btn-close close_btn" onClick={toggleSidebar}></button>
      <h4 className=" sidebar_title">{"Admin Panel"}</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/admin/dashboard"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <FaTachometerAlt />
            {"Dashboard"}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/admin/ManageUsers"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <FaUsers />
            {"Users"}
          </Link>
        </li>
        

        {/* <li className="nav-item">
          <Link
            to="/admin/takeaway"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <AiFillProduct />
            {"Add Takeaway Items"}
          </Link>
        </li> */}

        <li className="nav-item dropdown">
          <Link
            to="#"
            className="nav-link dropdown-toggle text-white d-flex align-items-center gap-2"
            id="takeawayDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <AiFillProduct />
            {"Menu"}
          </Link>

          <ul className="dropdown-menu" aria-labelledby="takeawayDropdown">
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
          </ul>
        </li>



        <li>
          <div
            className="nav-link"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <AiOutlineProduct />
            {"Logout"}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
