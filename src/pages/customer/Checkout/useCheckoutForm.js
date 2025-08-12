// src/components/customer/Checkout/useCheckoutForm.js

import { useState } from "react";

export default function useCheckoutForm(initialData = {}) {
  const [shippingData, setShippingData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    pinCode: "",
    address: "",
    landmark: "",
    ...initialData,
  });

  const handleFormChange = (field, value) => {
    setShippingData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const { fullName, phoneNumber, email, pinCode, address } = shippingData;
    return fullName && phoneNumber && email && pinCode && address;
  };

  const resetForm = () => {
    setShippingData({
      fullName: "",
      phoneNumber: "",
      email: "",
      pinCode: "",
      address: "",
      landmark: "",
    });
  };

  return {
    shippingData,
    handleFormChange,
    validate,
    resetForm,
    setShippingData,
  };
}
