import React, { useState } from "react";
import TakeawaySection from "./Takeaway/TakeawaySection";
import DiningSection from "./Dining/DiningSection";
import DrinksSection from "./Drinks/DrinksSection";
import SetMealSection from "./SetMeals/SetMealSection";
import "../../../assets/styles/customer/Menu/Menu.css";
import { Toast } from "../../../pages/common/AlertService";
import CustomHeroSection from "../../components/layout/CustomHeroSection";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("takeaway");

  return (
    <>
      <Toast />

      <CustomHeroSection
        title="Discover Our Menu"
        slogan="Our food is made with love, passion, and a touch of magic."
      />

      <div className="menu-container container-fluid pt-5">
        <div className="menu-tabs">
          <button
            className={`btn ${
              activeTab === "takeaway" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("takeaway")}
          >
            🍱 Takeaway
          </button>
          <button
            className={`btn ${
              activeTab === "dining" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("dining")}
          >
            🍽️ Dining
          </button>
          <button
            className={`btn ${
              activeTab === "drinks" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("drinks")}
          >
            🍹 Drinks
          </button>
        </div>

        {activeTab === "takeaway" && <TakeawaySection activeTab={activeTab} />}
        {activeTab === "dining" && <DiningSection />}
        {activeTab === "drinks" && <DrinksSection />}
        {activeTab === "set_meals" && <SetMealSection />}
      </div>
    </>
  );
};

export default Menu;

{
  /* <button
  className={`btn mx-2 ${activeTab === "set_meals" ? "btn-primary" : "btn-outline-primary"}`}
  onClick={() => setActiveTab("set_meals")}
>
  Set Meals 
</button> */
}
