import { NavLink } from "react-router-dom";
import web_logo from "../../../assets/media/image/web_logo.png";
import {useAuth} from '../../../context/AuthContext';
const NavbarBrandLogo = () => {
  const {role} =useAuth();
  
 const redirect = role === 'admin' ? '/admin/dashboard' : '/';

  return(
    <>
      <NavLink className="navbar-brand d-flex align-items-center" to={redirect}>
        <img src={web_logo} alt="Website Logo" className="me-2 web_logo"  />
      </NavLink>
    </>
  )
  
};

export default NavbarBrandLogo;
