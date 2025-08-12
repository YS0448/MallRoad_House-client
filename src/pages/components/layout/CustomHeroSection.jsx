import React from 'react';
import '../../../assets/styles/components/layout/CustomHeroSection.css';

const CustomHeroSection = ({ title, slogan }) => {
  return (
    <section className="custom-hero-section">
      <div className="custom-hero-container">
        <h1 className="custom-hero-heading">{title}</h1>
        <p className="custom-hero-subtext">{slogan}</p>
      </div>
    </section>
  );
};

export default CustomHeroSection;
