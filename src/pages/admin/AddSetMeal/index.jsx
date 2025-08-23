import React from "react";
import CategoryCard from "./CategoryCard";
import ImageUploader from "./ImageUploader";
import { useSetMealForm } from "./useSetMealForm";
import "../../../assets/styles/admin/SetMeal/AddSetMeal.css";
import {Toast} from '../../../pages/common/AlertService'
const initialCategory = { cat_name: "", choose: 0, fields: [{ itemName: "", extra_charge: 0 }] };
const initialState = { mealName: "", price: 0, mealImageFile: null, mealImagePreview: null, categories: [initialCategory] };

const AddSetMeal = () => {
  const {
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
  } = useSetMealForm(initialState, initialCategory);

  const categoryOptions = ["Sides", "Starters", "Curries", "Rice & Naan"];


  return (
    <>
    <Toast/>
    <div className="meal-container container-fluid container-md">
      <h2>Add Set Meal</h2>
      <div className="row">
        <div className="col-md-8">
          <label htmlFor="">Meal Name</label>
          <input type="text" placeholder="Enter meal name" className="mb-2" value={formData.mealName} onChange={e => handleMealNameChange(e.target.value)} />
          
          <label htmlFor="">Price (£)</label>
          <input type="text" placeholder="Enter meal price" className="mb-2" value={formData.price || ""} onChange={e => handlePriceChange(e.target.value)} />
          
          {formData.categories.map((cat, i) => (
            <CategoryCard
              key={i} cat={cat} catIndex={i} categoryOptions={categoryOptions}
              handleCategoryChange={handleCategoryChange} addField={addField} removeField={removeField}
              handleFieldChange={handleFieldChange} removeCategory={removeCategory} handleChooseInputChange={handleChooseInputChange}
            />
          ))}
          <button type="button" className="btn btn-primary" onClick={addCategory}>+ Add Category</button>
        </div>
        <div className="col-md-4">
          <ImageUploader mealImage={formData.mealImagePreview} handleImageChange={e => handleImageChange(e.target.files[0])} removeImage={removeImage} />
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddSetMeal;
