import React from "react";
import MenuCarousel from "./MenuCarousel";


const CategorySection = ({ category, items , activeTab}) => {

  // formate title
  const toTitleCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="category-section mb-4">
      <h4 className="category-title mb-3">{toTitleCase(category)}</h4>
      <MenuCarousel items={items} activeTab={activeTab}/>
    </div>
  );
};

export default CategorySection;
