import React, { useState } from "react";
import { FaUtensils, FaShoppingBag, FaConciergeBell, FaWineGlassAlt } from "react-icons/fa";
import "../../assets/styles/components/common/MenuButton.css";
import takeaway_menu from '../../assets/media/pdf/takeaway_menu.pdf'
import dining_menu from '../../assets/media/pdf/dining_menu.pdf'
import drinks_menu from '../../assets/media/pdf/drinks_menu.pdf'

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { label: "Takeaway", file: takeaway_menu, icon: <FaShoppingBag /> },
    { label: "Dining", file: dining_menu, icon: <FaConciergeBell /> },
    { label: "Drinks", file: drinks_menu, icon: <FaWineGlassAlt /> }
  ];

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop();
    link.click();
  };

  return (
    <div className="menu-float-wrapper">
      <button
        className="menu-float-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaUtensils size={24} />
      </button>

      {isOpen && (
        <div className="menu-dropdown">
          {menus.map((menu, index) => (
            <button
              key={index}
              onClick={() => handleDownload(menu.file)}
              className="menu-dropdown-item"
            >
              {menu.icon} {menu.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
