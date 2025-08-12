import React from 'react';
// import main_img from '../../../assets/media/image/main_img2.png';
import main_img from '../../../assets/media/image/main_img2.png';
import '../../../assets/styles/customer/Home/HeroSection.css';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
let navigate =useNavigate();

const handleOrderNow = () => {
  navigate('/menu');    
}
const handleReserveTable = () => {
  window.open('https://mallroadhouse.resos.com/booking', '_blank');
};

  return (
    <>
    <div className="home-container">
      <div className="hero-banner">
        <img src={main_img} alt="Main Banner" className="home-main-img" />

        <div className="hero-content text-center">
          <h1>WELCOME TO MALLROAD HOUSE</h1>
          {/* <p>Crafted with passion, served with elegance</p> */}
          <p>
            Mallroad House offers a fusion of Indian, Asian, and European
            cuisine
          </p>
        <div className="hero-buttons">
            <button className="btn order-now-btn me-2" onClick={handleOrderNow}>Order Now</button>
            <button className="btn reserve-table-btn" onClick={handleReserveTable}>Reserve a Table</button>
        </div>

        </div>
      </div>
      </div>
    </>
  );
};


export default HeroSection;