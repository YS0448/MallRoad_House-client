import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import "../../../assets/styles/customer/Menu/MenuCard.css";
import allergens_icons from "../../../assets/media/image/allergens_icons/index";
import apiCall from "../../../api/apiCall";
import { showToast } from "../../../pages/common/AlertService";
import { useAuth } from '../../../context/AuthContext';
const MenuCard = ({ item, activeTab }) => {
  const { role } = useAuth();
  let navigate = useNavigate()
  const [localItem, setLocalItem] = useState(item);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const truncateText = (text, wordLimit = 12) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleAddToCart=async() => {
    try {
      const payload = {
        item_id: item.item_id,      // ensure item_id exists in item object
        quantity: 1          // default to 1; you can customize
      };
      const res = await apiCall("POST", "api/cart", payload);
      showToast("success","Item added to cart!" );
      setLocalItem(prev => 
        ({...prev, 
          quantity: 1,
          cart_id: res.data.cart_id       
        })
      );

    } catch (error) {
      console.error("Add to cart failed:", error);
      showToast("error","Failed to add item to cart." );
    }
  }

const handleQuantityChange = async (cart_id, delta) => {

    // const item = item.find(item => item.cart_id === cart_id);
    const newQuantity = item.quantity + delta;
    // if (newQuantity <= 0) return;

    try {
      await apiCall("PUT", `/api/cart/${cart_id}`, { quantity: newQuantity });
      // fetchCartItems();
      setLocalItem(prev => 
        ({...prev, 
          quantity: newQuantity       
        })
      );

    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };


  const handleOrder=async()=>{
    try{
      if(role === 'guest'){
        navigate('/login');
      }else{
        navigate('/checkout', { state: { items: [item] } });
      }
      
    }catch(error){
      console.error("Order failed:", error);
    }
  }


  return (
    <div className="card h-100 menu-card d-flex flex-column">
      <img
        src={baseUrl + localItem.image_path}
        className="card-img-top menu-card-img"
        alt={localItem.food_name}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        {/* Top content */}
        <div>
          <h5 className="card-title">{localItem.item_name}</h5>

          <div className="allergen-icons-container d-flex flex-wrap gap-2 mt-2">
            {localItem.allergens_icons &&
              localItem.allergens_icons.split(",").map((icon, idx) => {
                const iconName = icon.trim().toLowerCase();
                const iconSrc = allergens_icons[iconName];
                return (
                  iconSrc && (
                    <div key={idx} className="allergen-icon-wrapper" title={iconName}>
                      <img
                        src={iconSrc}
                        alt={`allergen-${iconName}`}
                        className="allergen-icon"
                      />
                    </div>
                  )
                );
              })}
          </div>

          <p
            className={`card-text description-toggle ${
              showFullDescription ? "expanded" : ""
            }`}
            onClick={toggleDescription}
            title="Click to toggle full description"
          >
            {showFullDescription
              ? localItem.description
              : truncateText(localItem.description)}
          </p>
        </div>

        {/* Bottom content */}
        <div className="card-footer-section mt-3">
          {(localItem.status === "available" && activeTab==="takeaway" && activeTab==="dining")&& (

            <p className="card-text fw-bold">£{localItem.price}</p>
          )}
          <span
            className={`badge ${
              localItem.status === "available" ? "bg-success" : "bg-danger"
            }`}
          >
            {localItem.status === "available" ? "" : "Out of Stock"}
          </span>

          {/* Buttons */}
          {(localItem.status === "available" && activeTab==="takeaway" )&& (
            <div className="mt-3 d-flex gap-2">

            {localItem.quantity !== null && localItem.quantity > 0 ? (
                <>
                   <div className="quantity-controls d-flex align-items-center gap-2 px-2">
                     <button
                       className="btn btn-sm btn-outline-secondary"
                       onClick={() => handleQuantityChange(localItem.cart_id, -1)}
                     >
                       -
                     </button>
                     <span>{localItem.quantity}</span>
                     <button
                       className="btn btn-sm btn-outline-secondary"
                       onClick={() => handleQuantityChange(localItem.cart_id, 1)}
                     >
                       +
                     </button>
                   </div>
                </>
            ):(
            <button className="btn btn-sm btn-outline-primary w-100" onClick={handleAddToCart}>Add to Cart</button>
            )}
              <button className="btn btn-sm btn-primary w-100" onClick={handleOrder} >Order Now</button>
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
