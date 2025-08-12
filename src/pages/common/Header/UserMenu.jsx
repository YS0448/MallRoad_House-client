import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const UserMenu = ({
  setUser,
  setRole,
  role
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole("guest");
    navigate("/login");
  };

    return (
      <>
      {(role === "admin" || role === "customer") && (
        <>
          <li className="nav-item dropdown ">
        <span
          className="nav-link dropdown-toggle d-flex align-items-center"
          id="userDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
        >
          <FaUserCircle className="user_icon me-1" />
        </span>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>          
          <li><hr className="dropdown-divider" /></li>
          <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
        </ul>
      </li>
      
        </>
      )}
      

    {(role === "guest") && (
      <>
      <li className="nav-item d-flex align-items-center justify-content-center ">
        <NavLink className="btn me-2 login_btn" to="/login">Login</NavLink>
        <NavLink className="btn signup_btn" to="/signup">Signup</NavLink>
      </li>
      </>
    )}      
    
    </>
  );
};

export default UserMenu;
