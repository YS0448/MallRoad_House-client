import React from "react";
import AllergenSelector from "./AllergenSelector"; // Renamed import

const FoodDetails = ({
  formData,
  handleChange,
  selectedAllergens,
  setSelectedAllergens,
  categoryOptions=[]
}) => (
  <div className="card shadow p-4">
    <h5 className="section-title mb-4">Food Details</h5>

    <div className="row">
<div className="col-6 mb-2">
  <label className="form-label">Category</label>
  <input
    list="category-options"
    name="category"
    className="form-control"
    value={formData.category}
    onChange={handleChange}
    placeholder="e.g. Fast Food"
  />
  <datalist id="category-options">
    {(categoryOptions || []).map((cat, i) => (
      <option key={i} value={cat} />
    ))}
  </datalist>
</div>




      <div className="col-md-6 mb-2">
        <label className="form-label">Food Name</label>
        <input
          type="text"
          name="food_name"
          className="form-control"
          value={formData.food_name}
          onChange={handleChange}
          placeholder="e.g. Veg Burger"
        />
      </div>

      <div className="col-md-6 mb-2">
        <label className="form-label">Price (£)</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. 120"
        />
      </div>

      <div className="col-md-6 mb-2">
        <label className="form-label">Food Description</label>
        <textarea
          name="description"
          className="form-control description-area"
          rows="2"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a short description..."
        ></textarea>
      </div>

      <div className="col-md-6 mb-2">
        <label className="form-label">Food Allergens</label>
        <AllergenSelector
          selectedAllergens={selectedAllergens}
          setSelectedAllergens={setSelectedAllergens}
        />
      </div>

      <div className="col-md-4 mb-2">
        <label className="form-label">Status</label>
        <select
          name="status"
          className="form-control"
          onChange={handleChange}
          value={formData.status}
        >
          <option value="">Select Status</option>
          <option value="available">Available</option>
          <option value="out_of_stock">Out Of Stock</option>
          <option value="deactivated">Deactivated</option>
        </select>
      </div>
    </div>
  </div>
);

export default FoodDetails;
