import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import apiCall from "../../../api/apiCall";
import {showToast} from '../../common/AlertService';
const useContactUsForm = () => {
  const initialFormData = {
    full_name: "",
    email: "",
    phone_no: "",
    message: "",
    captcha_answer:''
  };
  const [formData, setFormData] = useState(initialFormData);

  const { user, role } = useAuth();

  const [captchaSvg, setCaptchaSvg] = useState("");


    // Get CAPTCHA from backend
const fetchCaptcha = async () => {
  try {
    const res = await apiCall('GET', '/captcha');
    setCaptchaSvg(res.data.data); // SVG
  } catch (error) {
    console.error("Failed to fetch captcha", error);
  }
};

  useEffect(() => {
    fetchCaptcha();
  }, []);  

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user.full_name || "",
        email: user.email || "",
      }));
    }
  }, [user]);


  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const validateForm = () => {
  const { full_name, email, phone_no, message, captcha_answer } = formData;

  if (!full_name.trim() || !email.trim() || !phone_no.trim() || !message.trim()) {
    showToast('error', 'All fields are required.')
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('error', 'Invalid email format.')
    return false;
  }

  const phoneRegex = /^\+?[0-9]{7,15}$/;  
  if (!phoneRegex.test(phone_no)) {
    showToast('error', 'Invalid phone number format.')
    return false;
  }

  if (!captcha_answer .trim()) {
    showToast('error', 'Please enter the CAPTCHA.');
    return false;
  }
  return true;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  console.log("Form submitted with data:", formData);
  try {
    const data = { ...formData, user_id: user?.user_id || '' , role: role};
    console.log('data:', data);
    const response = await apiCall("POST", "/api/contact_us", data);
    console.log("response:", response);
    
    showToast('success', 'Thank you for contacting us. We will get back to you shortly.')
    setFormData(initialFormData);

  } catch (error) {
    console.error("Error during contact us submission:", error);
        showToast('error', error?.message || 'Failed to submit contact form. Please try again.')
    return;
  }
};



  return {
    formData,
    handleInputChange,
    handleSubmit,
    role,
    captchaSvg, 
    fetchCaptcha, 
  };
};

export default useContactUsForm;
