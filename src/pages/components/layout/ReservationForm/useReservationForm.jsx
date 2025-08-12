import React, { useState, useEffect } from "react";
import apiCall from "../../../../api/apiCall";
import { showToast } from "../../../common/AlertService";
import { useAuth } from "../../../../context/AuthContext";
const useReservationForm = () => {
const initialFormData = {
  full_name: '',
  email: '',
  phone_no: '',
  message: '',
  date: null,
  time: null,
  captcha_answer: '',
};
const {user}=useAuth()

  const [formData, setFormData] = useState(initialFormData);
  const [captchaSvg, setCaptchaSvg] = useState('');


  
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user.full_name || "",
        email: user.email || "",
      }));
    }
  }, [user]);


  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
  setFormData((prev) => ({
    ...prev,
    date,
  }));
};

const handleTimeChange = (time) => {
  setFormData((prev) => ({
    ...prev,
    time,
  }));
};

  // Get CAPTCHA from backend
  const fetchCaptcha = async () => {
    try {
      const res = await apiCall("GET", "/captcha");
      setCaptchaSvg(res.data.data); // SVG
    } catch (error) {
      console.error("Failed to fetch captcha", error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

const resetForm = () => {
  setFormData(initialFormData);
  setCaptchaSvg('')
  
};


// Send Data to backend
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevents page reload

  try {
    const res = await apiCall("POST", "/reservations", formData);
    console.log("Reservation successful:", res.data);

    showToast("success", "Your reservation has been made successfully.");
    resetForm()

  } catch (error) {
    console.error("Reservation failed:", err);
    showToast("error", error?.message || "Failed to make your reservation. Please try again."  );
  }
};


  return {
    formData,
    handleinputChange,
    fetchCaptcha,
    captchaSvg,
      handleDateChange,
  handleTimeChange,
  handleSubmit
  };
};

export default useReservationForm;
