import React, { useState, useEffect } from "react";
import "../../../../assets/styles/customer/Menu/setMeal.css";
import apiCall from "../../../../api/apiCall";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toast ,showToast } from '../../../common/AlertService'
const SetMealItem = ({ data }) => {
  let {
    set_meal_id: meal_id,
    cart_id,
    set_meal_name: item_name,
    price: basePrice,
    image_path,
    categories = {},
    quantity = 0,
    description = {},
    status,    
  } = data;

  const { role } = useAuth();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [mealQty, setMealQty] = useState(quantity);
  const [selectedItems, setSelectedItems] = useState(description || {});
  const [cartId, setCartId] = useState(data.cart_id || null);

  // ✅ Initialize selectedItems
  useEffect(() => {
    const initialSelected = {};
    Object.entries(categories).forEach(([catName, category]) => {
      if (description && description[catName]) {
        initialSelected[catName] = description[catName];
      } else {
        initialSelected[catName] = {
          normal:
            catName === "sides"
              ? category.items
                  .filter((i) => Number(i.extra_charge) === 0)
                  .map((i) => ({
                    id: i.set_meal_item_id,
                    name: i.item_name,
                    extra_charge: 0,
                  }))
              : [],
          extra: [],
        };
      }
    });
    setSelectedItems(initialSelected);
  }, [categories, description]);

  // ✅ Handle selection change
  const handleCheckboxChange = async (catName, item, group, maxChoices) => {
    const newItem = {
      id: item.set_meal_item_id,
      name: item.item_name,
      extra_charge: Number(item.extra_charge) || 0,
    };

    setSelectedItems((prev) => {
      const prevCategory = prev[catName] || { normal: [], extra: [] };
      const selectedGroup = [...prevCategory[group]];
      const allowedChoices = group === "extra" ? 1 : maxChoices;
      const alreadySelected = selectedGroup.find((it) => it.id === newItem.id);

      let updatedState;

      if (alreadySelected) {
        updatedState = {
          ...prev,
          [catName]: {
            ...prevCategory,
            [group]: selectedGroup.filter((it) => it.id !== newItem.id),
          },
        };
      } else {
        if (selectedGroup.length >= allowedChoices) {
          if (group === "extra") {
            updatedState = {
              ...prev,
              [catName]: {
                ...prevCategory,
                [group]: [newItem], // replace
              },
            };
          } else {
            return prev; // block normal if max reached
          }
        } else {
          updatedState = {
            ...prev,
            [catName]: {
              ...prevCategory,
              [group]: [...selectedGroup, newItem],
            },
          };
        }
      }

      // Sync with backend if exists in cart
      if (cartId) {
        handleQtyChange();
      }
      return updatedState;
    });
  };

  // ✅ Calculate extra charges
  const getExtraChargeTotal = () => {
    let total = 0;
    Object.entries(selectedItems).forEach(([_, selected]) => {
      [...(selected.normal || []), ...(selected.extra || [])].forEach((item) => {
        if (item && Number(item.extra_charge) > 0) {
          total += Number(item.extra_charge);
        }
      });
    });
    return total;
  };

  const totalPrice = (Number(basePrice) + getExtraChargeTotal());
  const totalAmount = totalPrice * (mealQty || 1);

  // ✅ Quantity change
  const handleQtyChange = async (type) => {
    if (!cartId) return;

    let newQty = mealQty;
    if (type === "inc") newQty = mealQty + 1;
    if (type === "dec") newQty = mealQty > 1 ? mealQty - 1 : 0;
    setMealQty(newQty);
    

    try {
      let response= await apiCall("PUT", `/api/cart/${cartId}`, {
        quantity: newQty,
        description: JSON.stringify(selectedItems),
      });
   
      if(response.data.message ==="Cart item removed"){
        setCartId(null)
      }
    } catch (err) {
      console.error("Error updating quantity", err);
      showToast('error',err?.message || 'Failed to Update')
    }
  };

  // ✅ Add to cart
  const handleAddToCart = async () => {
    const payload = {
      meal_id,
      quantity: 1,
      description: JSON.stringify(selectedItems),
      menu_type: "set_meal",
      totalAmount,
    };

    try {
      const response = await apiCall("POST", "api/cart", payload);
      setMealQty(1);
      if(response?.data?.cart_id){
        // cart_id = response.data.cart_id
        setCartId(cart_id)
      }
      
    } catch (error) {
      console.error("Add to cart failed:", error);
      showToast('error',error?.message || 'Failed to add item into cart')
    }
  };

  // ✅ Order Now
  const handleOrder = async () => {
    try {
      if (role === "guest" || role === "admin") {
        navigate("/login");
      } else {
        let localItem = {
          meal_id,
          cart_id: cartId,
          item_name,
          price: totalPrice,
          image_path,
          quantity: quantity > 0 ? quantity: 1,
          description: selectedItems,
          status,
        };
        navigate("/checkout", { state: { items: [localItem] } });
      }
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <>
    <Toast/>    
    <div className="shadow p-4 set-meal-row">
      <h4 className="set-meal-title mb-3">{item_name}</h4>
      <div className="row align-items-center">
        <div className="text-center">
          <img src={baseUrl + image_path} alt="Set Meal" className="set-meal-img" />
        </div>

        <div className="col-12 set-meal-items-container">
          <h5 className="mb-4">Build Your Meal</h5>

          {Object.entries(categories).map(([catName, category]) => (
            <div className="col-12 mb-3" key={catName}>
              <div className="category-section mb-4">
                <h6 className="category-header">
                  {catName.charAt(0).toUpperCase() + catName.slice(1)}
                </h6>

                {/* Normal items */}
                {category.items.some((item) => Number(item.extra_charge) === 0) && (
                  <>
                    <p className="fw-semibold mb-1">
                      Normal{" "}
                      {category.max_choices === 0 ? "" : `(Choose up to ${category.max_choices})`}
                    </p>

                    {category.items
                      .filter((item) => Number(item.extra_charge) === 0)
                      .map((item) => (
                        <div key={item.set_meal_item_id} className="mb-2">
                          <input
                            type="checkbox"
                            id={`${catName}-normal-${item.set_meal_item_id}`}
                            checked={
                              selectedItems[catName]?.normal?.some(
                                (it) => it.id === item.set_meal_item_id
                              ) || false
                            }
                            readOnly={catName === "sides"}
                            onChange={() =>
                              catName !== "sides" &&
                              handleCheckboxChange(catName, item, "normal", category.max_choices)
                            }
                          />
                          <label htmlFor={`${catName}-normal-${item.set_meal_item_id}`} className="ms-2">
                            {item.item_name}
                          </label>
                        </div>
                      ))}
                  </>
                )}

                {/* Extra items */}
                {category.items.some((item) => Number(item.extra_charge) > 0) && (
                  <>
                    <p className="fw-semibold mt-3 mb-1">Extra (Choose up to 1)</p>
                    {category.items
                      .filter((item) => Number(item.extra_charge) > 0)
                      .map((item) => (
                        <div key={item.set_meal_item_id} className="mb-2">
                          <input
                            type="checkbox"
                            id={`${catName}-extra-${item.set_meal_item_id}`}
                            checked={
                              selectedItems[catName]?.extra?.some(
                                (it) => it.id === item.set_meal_item_id
                              ) || false
                            }
                            onChange={() => handleCheckboxChange(catName, item, "extra", 1)}
                          />
                          <label htmlFor={`${catName}-extra-${item.set_meal_item_id}`} className="ms-2">
                            {item.item_name}{" "}
                            <span className="text-muted">
                              (+£{Number(item.extra_charge).toFixed(2)})
                            </span>
                          </label>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Qty & Total */}
        <div className="col-12">
          <div className="row my-3 align-items-center">
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0"></div>
            <div className="col-md-6 text-center text-md-end">
              <p className="fw-bold m-0">Amount: £ {totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        
        <div className="d-md-flex text-center ">
          {mealQty ? (
            <div className="d-inline-flex align-items-center rounded p-2">
              <button
                className="btn btn-outline-dark btn-sm bg-secondary text-light"
                onClick={() => handleQtyChange("dec")}
              >
                -
              </button>
              <span className="fw-bold mx-3">{mealQty}</span>
              <button
                className="btn btn-outline-dark btn-sm bg-secondary text-light"
                onClick={() => handleQtyChange("inc")}
              >
                +
              </button>
            </div>
          ) : 
          status==='available' ? (
              <button className="mb-2 setmeal_addcart_btn ms-2" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            ):(
              <button className="mb-2 setmeal_out_of_order_btn ms-2" onClick={handleAddToCart}>
               Out Of Stock
            </button>
            )
            
          }
          { status==='available' ? (
          <button className="mb-2 setmeal_order_btn ms-2" onClick={handleOrder}>
            🚀 Order Now
          </button>
          ):('')
        }

        </div>
      </div>
    </div>
    </>
  );
};

export default SetMealItem;
