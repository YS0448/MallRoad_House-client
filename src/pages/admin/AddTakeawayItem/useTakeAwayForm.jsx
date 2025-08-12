import { useState, useEffect, useRef } from "react";
import apiCall from "../../../api/apiCall";
import { showToast } from "../../common/AlertService";

const initialFormData = {
  category: "",
  food_name: "",
  price: "",
  description: "",
  image: null,
  status: "",
};

const useTakeAwayForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const modalRef = useRef(null);

  // 🔄 Fetch categories from backend
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await apiCall("GET", "/admin/getTakeawayCatogories");
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
    setSelectedAllergens([]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form Data:", formData);
      console.log("Selected Allergens:", selectedAllergens);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value);
      });

      const selected_allergens = JSON.stringify(selectedAllergens.map((a) => a.value));
      data.append("allergens", selected_allergens);

      const response = await apiCall("POST", "/admin/createTakeAwayMenu", data);
      console.log("response:", response);
      showToast("success", "Takeaway item submitted successfully");
      // handleReset();
    } catch (error) {
      console.error("Error during takeaway form submission:", error);
      showToast("error", error.message || "Failed to submit takeaway form. Please try again.");
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
    selectedAllergens,
    setSelectedAllergens,
    categoryOptions,
    openModal,
    modalRef,
  };
};

export default useTakeAwayForm;
