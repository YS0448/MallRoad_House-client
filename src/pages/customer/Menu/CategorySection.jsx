import React from "react";
import MenuCarousel from "./MenuCarousel";

const CategorySection = ({ category, items , activeTab}) => {
  return (
    <div className="category-section mb-4">
      <h4 className="category-title mb-3">{category}</h4>
      <MenuCarousel items={items} activeTab={activeTab}/>
    </div>
  );
};

export default CategorySection;
