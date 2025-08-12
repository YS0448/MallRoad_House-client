import React from "react";
import "../../../assets/styles/components/layout/RestaurantInfoSection.css";

const RestaurantInfoSection = () => {
  return (
    <div className="container my-5 info-section">
      <div className="info-grid text-center">
        <div className="info-box">
          <div className="info-icon">🕒</div>
          <h4 className="info-title">Opening Hours</h4>
          <p className="tight-text">Open 7 Days a Week</p>
          <p className="tight-text">4:00 PM – 10:00 PM</p>
        </div>

        <div className="info-box">
          <div className="info-icon">📞</div>
          <h4 className="info-title">Reception Contact</h4>
          <p className="tight-text">Tel. Number</p>
          <p className="tight-text">0141 280 0585</p>
        </div>

        <div className="info-box">
          <div className="info-icon">📍</div>
          <h4 className="info-title">Our Location</h4>
          <p className="tight-text">Bishopbriggs, Scotland UK</p>
          <p className="tight-text">137 Auchinairn Road, G64 1NF</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfoSection;
