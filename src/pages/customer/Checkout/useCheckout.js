// src/components/customer/Checkout/useCheckout.js

import useOrderDetails from "./useOrderDetails";
import useCheckoutForm from "./useCheckoutForm";
import apiCall from "../../../api/apiCall";
import { showToast } from "../../common/AlertService";
import {useNavigate } from "react-router-dom";
export default function useCheckout(initialItems = []) {
  const navigate = useNavigate();
    const {
    items,
    loading,
    increaseQty,
    decreaseQty,
    grandTotal,
    setItems,
    handleRemoveItem
  } = useOrderDetails(initialItems);

  const {
    shippingData,
    handleFormChange,
    validate,
    resetForm,
  } = useCheckoutForm();

  const paymentMethod = "cod";

//  Place Order  
  const placeOrder = async () => {
    if (items.length === 0) {
        showToast('error','Your cart is empty.')
        return false;
    }

    if (!validate()) {
        showToast('error','Please fill in all required shipping details.')
        return false;
    }

    const orderPayload = {
        items,
        shippingData,
        paymentMethod,
        totalAmount: grandTotal,
    };
    
    console.log('orderPayload:',  );
    try {
      const response = await apiCall("POST", "/api/orders", orderPayload);
      showToast('success','Order placed successfully.'+ response.data.orderId)

      setItems([]);
      resetForm();
        setTimeout(() => {
         navigate('/menu')   
        }, 2000);
      return true;
    } catch (error) {
        showToast('error','Failed to place order. Please try again.' + (error.message || JSON.stringify(error)))
      return false;
    }
  };

  return {
    items,
    loading,
    shippingData,
    handleFormChange,
    increaseQty,
    decreaseQty,
    grandTotal,
    placeOrder,
    handleRemoveItem
  };
}
