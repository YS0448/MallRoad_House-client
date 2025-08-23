import React, { useState, useEffect } from "react";
import TakeawaySection from "./Takeaway/TakeawaySection";
import DiningSection from "./Dining/DiningSection";
import DrinksSection from "./Drinks/DrinksSection";
import SetMealSection from "./SetMeal/SetMealSection";
import "../../../assets/styles/customer/Menu/Menu.css";
import { Toast } from "../../../pages/common/AlertService";
import CustomHeroSection from "../../components/layout/CustomHeroSection";

const Menu = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "takeaway"
  );
  
  // ✅ Save to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

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
          <button
            className={`btn ${
              activeTab === "set_meal" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("set_meal")}
          >
            🍛  Set Meal
          </button>
        </div>

        {activeTab === "takeaway" && <TakeawaySection activeTab={activeTab} />}
        {activeTab === "dining" && <DiningSection activeTab={activeTab} />}
        {activeTab === "drinks" && <DrinksSection activeTab={activeTab} />}
        {activeTab === "set_meal" && <SetMealSection activeTab={activeTab} />}
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
