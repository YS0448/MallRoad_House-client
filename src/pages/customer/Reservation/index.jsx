import React from "react";
// import ReserveForm from "../../../components/ReserveForm";
import ReservationForm from "../../components/layout/ReservationForm/ReservationForm";
import HaveAnyQuery from "./HaveAnyQuery";
import RestaurantInfoSection from "../../components/layout/RestaurantInfoSection";
import CustomHeroSection from "../../components/layout/CustomHeroSection";

const Reservation = () => {

  return (
    <>      
      <CustomHeroSection
        title="RESERVATION"
        slogan="Your table is waiting."
      />
      <RestaurantInfoSection/>
      <ReservationForm />
      <HaveAnyQuery />
      
    </>
  );
};

export default Reservation;
