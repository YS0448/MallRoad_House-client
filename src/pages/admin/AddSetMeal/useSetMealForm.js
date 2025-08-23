import { useState } from "react";
import { validateSetMealForm } from "./validateSetMealForm";
import apiCall from "../../../api/apiCall";
import { showToast } from "../../common/AlertService";

export const useSetMealForm = (initialState, initialCategory) => {
//   const [formData, setFormData] = useState(initialState);
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(initialState)));


  const isValidNumber = (value) => /^[0-9]*\.?[0-9]{0,2}$/.test(value);

  const handleMealNameChange = (value) => setFormData(prev => ({ ...prev, mealName: value }));
  const handlePriceChange = (value) => {
    if (!isValidNumber(value)) return;
    setFormData(prev => ({ ...prev, price: value }));
  };
  const handleImageChange = (file) => {
    if (!file) return;
    setFormData(prev => ({
      ...prev,
      mealImageFile: file,
      mealImagePreview: URL.createObjectURL(file)
    }));
  };
  const removeImage = () => setFormData(prev => ({ ...prev, mealImageFile: null, mealImagePreview: null }));

  // Category operations
  const addCategory = () =>{
    setFormData(prev => ({
      ...prev,
      categories: [
        ...prev.categories,
        JSON.parse(JSON.stringify(initialCategory))
    ]
    }))
  };

  const removeCategory = (index) =>
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));

  const handleCategoryChange = (catIndex, value) => {
    const updated = [...formData.categories];
    updated[catIndex].cat_name = value;
    setFormData(prev => ({ ...prev, categories: updated }));
  };

  const addField = (catIndex) => {
    const updated = [...formData.categories];
    updated[catIndex].fields.push({ itemName: "", extra_charge: 0 });
    setFormData(prev => ({ ...prev, categories: updated }));
  };

  const removeField = (catIndex, fieldIndex) => {
    const updated = [...formData.categories];
    updated[catIndex].fields.splice(fieldIndex, 1);
    setFormData(prev => ({ ...prev, categories: updated }));
  };

  const handleFieldChange = (catIndex, fieldIndex, fieldName, value) => {
    const updated = [...formData.categories];
    if (fieldName === "extra_charge") {
      if (!isValidNumber(value)) return;
      updated[catIndex].fields[fieldIndex][fieldName] = value === "" ? "" : value;
    } else {
      updated[catIndex].fields[fieldIndex][fieldName] = value;
    }
    setFormData(prev => ({ ...prev, categories: updated }));
  };

  const handleChooseInputChange = (catIndex, value) => {
    if (!isValidNumber(value)) return;
    const updated = [...formData.categories];
    updated[catIndex].choose = value === "" ? "" : Number(value);
    setFormData(prev => ({ ...prev, categories: updated }));
  };


  const handleSubmit = async () => {
    console.log('formData:', formData);
    const validation = validateSetMealForm(formData);
    if (!validation.valid) return alert(validation.message);

    try {
      const payload = new FormData();
      payload.append("mealName", formData.mealName);
      payload.append("price", formData.price);
      payload.append("image", formData.mealImageFile);
      payload.append("categories", JSON.stringify(formData.categories));

      const response = await apiCall("POST", "/admin/createSetMealMenu", payload);
      showToast('success','Set Meal Submitted!')
      setFormData(() => JSON.parse(JSON.stringify(initialState)))
    } catch (error) {
      console.error(error);
      alert("Failed to submit. Please try again.");
      showToast('error', error.message || 'Failed to submit. Please try again.')
    }
  };

  
  return {
    formData,
    setFormData,
    handleMealNameChange,
    handlePriceChange,
    handleImageChange,
    removeImage,
    addCategory,
    removeCategory,
    handleCategoryChange,
    addField,
    removeField,
    handleFieldChange,
    handleChooseInputChange,
    handleSubmit
  };
};
