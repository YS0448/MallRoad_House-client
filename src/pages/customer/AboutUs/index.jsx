import React from "react";
import AboutUsInfoSection from "./AboutUsInfoSection";
import CustomHeroSection from "../../components/layout/CustomHeroSection";

const AboutUs = () => {
  return (
    <div>
      <CustomHeroSection
        title="ABOUT US"
        slogan="Crafted with passion, served with elegance."
      />
      <AboutUsInfoSection />
      {/* Add other sections like AboutUsInfoSection, AboutUsTeamSection, etc. here */}
    </div>
  );
};

export default AboutUs;
