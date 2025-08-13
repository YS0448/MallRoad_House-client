import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import web_logo from '../../assets/media/image/web_logo.png';
import '../../assets/styles/components/common/Footer.css';
const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-3 ">
      <div className="container">
        <div className="row">

          {/* Brand/Logo */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <img src={web_logo} alt="" className='web_logo'/>
            <h4 className="fw-bold mb-3 mt-2">MALLROAD HOUSE</h4>
            <p>Enjoy a delightful dining experience. Reserve your table, explore cuisines, and stay connected with us.</p>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/about_us" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/menu" className="text-white text-decoration-none">Menu</a></li>
              <li><a href="/contact_us" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact/Social */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="mb-3">Get in Touch</h5>
            <p><FaEnvelope className="me-2" /> info@mallroadhouse.co.uk</p>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-white fs-5"><FaFacebookF /></a>
              <a href="#" className="text-white fs-5"><FaInstagram /></a>
              <a href="#" className="text-white fs-5"><FaTwitter /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center pt-4 mt-4 border-top border-secondary">
          <p className="mb-0">&copy; 2025 MallRoad House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
