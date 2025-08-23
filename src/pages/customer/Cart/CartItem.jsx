import React from "react";
import allergens_icons from "../../../assets/media/image/allergens_icons/index";
import DescriptionAccordion from "../../../pages/common/DescriptionAccordion";

const CartItem = ({ item, onQuantityChange, onRemove, onCheckboxChange }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const updatedPrice = Number(item.price) + Number(item.extra_charge || 0);
      console.log('item.description:', item.description);

  return (
    <div className="cart-item row mb-3 p-2 border rounded align-items-center">
      {/* Image and Item Info */}
      <div className="col-12 col-md-7 d-flex align-items-center gap-3 mb-3 mb-md-0">
        <div>
          <input
            type="checkbox"
            className="form-check-input"
            checked={item.checked}
            onChange={() => onCheckboxChange(item.cart_id)}
          />
        </div>
        <img
          src={baseUrl + item.image_path}
          alt={item.item_name}
          className="cart-item-image"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />

        <div>
          <h5 className="mb-1">{item.item_name}</h5>

          <div className="allergen-icons-container d-flex flex-wrap gap-2 mt-2">
            {item.allergens_icons &&
              item.allergens_icons.split(",").map((icon, idx) => {
                const iconName = icon.trim().toLowerCase();
                const iconSrc = allergens_icons[iconName];
                return (
                  iconSrc && (
                    <div
                      key={idx + "-" + icon}
                      className="allergen-icon-wrapper"
                      title={iconName}
                    >
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

          <p className="mb-2">£{updatedPrice}</p>
          <div className="quantity-controls d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => onQuantityChange(item.cart_id, -1)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => onQuantityChange(item.cart_id, 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Total and Remove */}
      <div className="col-12 col-md-5 d-flex flex-column align-items-end">
        <p className="mb-2">
          <strong>Total:</strong> £{(updatedPrice * item.quantity).toFixed(2)}
        </p>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onRemove(item.cart_id)}
        >
          Remove
        </button>
      </div>

      {/* Accordion Component */}
      {/* <DescriptionAccordion item={item} /> */}
      <DescriptionAccordion description={item.description} />
    </div>
  );
};

export default CartItem;
