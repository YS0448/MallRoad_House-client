import React from "react";

const DrinksDetails = ({
  formData,
  handleChange,
  categoryOptions = [],
}) => (
  <div className="card shadow p-4">
    <h5 className="section-title mb-4">Drinks Details</h5>

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
        <label className="form-label">Drinks Name</label>
        <input
          type="text"
          name="drinks_name"
          className="form-control"
          value={formData.drinks_name}
          onChange={handleChange}
          placeholder="e.g. Veg Burger"
        />
      </div>

      <div className="col-md-6 mb-2">
        <label className="form-label">Drink Description</label>
        <textarea
          name="description"
          className="form-control description-area"
          rows="2"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a short description..."
        ></textarea>
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

export default DrinksDetails;
