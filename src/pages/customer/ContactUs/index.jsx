import React from "react";
import ContactUsForm from "./ContactUsForm";
import CustomHeroSection from "../../components/layout/CustomHeroSection";
import RestaurantInfoSection from "../../components/layout/RestaurantInfoSection";
import useContactUsForm from './useContactUsForm';
import { Toast }  from '../../common/AlertService';
const ContactUs = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    role,
    captchaSvg, 
    captchaAnswer, 
    fetchCaptcha, 
  } = useContactUsForm();

  return (
    <>
        <CustomHeroSection
            title="CONTACT US"
            slogan="Whether you have inquiries about reservations, menu details, or special requests, feel free to reach out."
        />
        <ContactUsForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          role={role}
          captchaSvg={captchaSvg} 
          captchaAnswer={captchaAnswer} 
          fetchCaptcha={fetchCaptcha} 
        />

        <RestaurantInfoSection />
        {/* toast container */}
        <Toast/>
    </>
  );
};

export default ContactUs;
