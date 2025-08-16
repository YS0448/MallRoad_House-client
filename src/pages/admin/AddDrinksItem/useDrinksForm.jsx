import { useState, useEffect, useRef } from "react";
import apiCall from "../../../api/apiCall";
import { showToast } from "../../common/AlertService";

const initialFormData = {
  category: "",
  drinks_name: "",
  description: "",
  image: null,
  status: "",
};

const useDrinksForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const modalRef = useRef(null);

  // 🔄 Fetch categories from backend
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await apiCall("GET", "/admin/getDrinksCatogories");
      if (res?.data?.categories) {
        setCategoryOptions(res.data.categories); // Make sure this is an array
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  fetchCategories();
}, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files && files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value);
      });

      const response = await apiCall("POST", "/admin/createDrinksMenu", data);
      showToast("success", "Drinks item submitted successfully");
      // handleReset();
    } catch (error) {
      console.error("Error during drinks form submission:", error);
      showToast("error", error.message || "Failed to submit drinks form. Please try again.");
    }
  };

  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  return {
    formData,
    handleChange,
    handleReset,
    handleSubmit,
    previewImage,
    categoryOptions,
    openModal,
    modalRef,
  };
};

export default useDrinksForm;
