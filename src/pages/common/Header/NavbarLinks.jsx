import { NavLink } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

const NavbarLinks = ({ role }) => {
  return (
    <>
      {(role === "customer" || role === "guest") && (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about_us">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/menu">
              Menu
            </NavLink>
          </li>       

          <li className="nav-item">
            <NavLink className="nav-link" to="/gallery">
              Gallery
            </NavLink>
          </li>          
          
          
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="https://mallroadhouse.resos.com/booking" >
              Reservation
            </NavLink>
          </li> */}
          
          <li className="nav-item">
            <a className="nav-link" href="https://mallroadhouse.resos.com/booking" target="_blank">Reservation</a>
          </li>
          
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact_us">
              Contact
            </NavLink>
          </li>
          

          { role === "customer" && (
            <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/my_orders">
              My Orders
            </NavLink>
          </li>

            <li className="nav-item">
              <NavLink className="nav-link " to="/cart">
                <IoMdCart className="cart_icon"/>
              </NavLink>
            </li>
            </>
          )}

        </>
      )}
    </>
  );
};

export default NavbarLinks;
