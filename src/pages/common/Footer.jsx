import React from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import web_logo from '../../assets/media/image/web_logo.png';
import '../../assets/styles/components/common/Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-white pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* Brand/Intro */}
          <div className="col-md-4 text-center text-md-start">
            <img src={web_logo} alt="MallRoad House" className="web_logo mb-3" />
            <h4 className="fw-bold brand-text">MALLROAD HOUSE</h4>
            <p className="footer-desc">
              Taste the finest cuisines with a cozy ambience. Perfect for family dinners, romantic dates, and celebrations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 text-center">
            <h5 className="mb-3 footer-heading">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="/" className="text-decoration-none">Home</a></li>
              <li><a href="/about_us" className="text-decoration-none">About Us</a></li>
              <li><a href="/menu" className="text-decoration-none">Menu</a></li>
              <li><a href="/reservation" className="text-decoration-none">Reservation</a></li>
              <li><a href="/contact_us" className="text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="mb-3 footer-heading">Get in Touch</h5>
            <p><FaMapMarkerAlt className="me-2" /> 123 Main Street, London</p>
            <p><FaPhoneAlt className="me-2" /> +44 123 456 789</p>
            <p><FaEnvelope className="me-2" /> info@mallroadhouse.co.uk</p>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mt-3">
              <a href="https://www.facebook.com/share/1Aa2gKUW5R/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
              <a href="https://www.instagram.com/mallroadhouse" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center pt-4 mt-4 border-top border-secondary">
          <p className="mb-0">&copy; {new Date().getFullYear()} MallRoad House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
