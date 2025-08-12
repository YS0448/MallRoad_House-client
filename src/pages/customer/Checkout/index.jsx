// src/components/customer/Checkout/index.jsx

import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import OrderDetails from "./OrderDetail";
import "../../../assets/styles/customer/Checkout/Checkout.css";
import { Toast } from "../../../pages/common/AlertService";
import useCheckout from "./useCheckout";

const Checkout = () => {
  const location = useLocation();
  const initialItems = location.state?.items || [];
  console.log('initialItems:', initialItems);

  const {
    items,
    loading,
    shippingData,
    handleFormChange,
    increaseQty,
    decreaseQty,
    grandTotal,
    placeOrder,
  } = useCheckout(initialItems);

  if (loading) return <p>Loading cart items...</p>;

  return (
    <>
      <Toast />
      <div className="checkout-wrapper">
        <div className="checkout-header py-4 text-center text-white">
          <h2 className="mb-1">Checkout</h2>
          <p className="mb-0">Secure & Easy</p>
        </div>
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="checkout-card p-4">
                <h5 className="section-title mb-3">Billing & Shipping Details</h5>
                <CheckoutForm
                  formData={shippingData}
                  onFormChange={handleFormChange}
                  onPlaceOrder={(e) => {
                    e.preventDefault();
                    placeOrder();
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="checkout-summary-card p-4 sticky-summary">
                <h5 className="section-title mb-3">Order Summary</h5>
                <OrderDetails
                  items={items}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  paymentMethod="cod"
                  grandTotal={grandTotal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
