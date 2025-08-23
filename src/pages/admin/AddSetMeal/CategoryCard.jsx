import React from "react";
import FieldRow from "./FieldRow";
import { RiDeleteBin6Line } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";

const CategoryCard = ({
  cat,
  catIndex,
  categoryOptions,
  handleCategoryChange,
  addField,
  removeField,
  handleFieldChange,
  removeCategory,
  handleChooseInputChange,
}) => {

  return (
    <div className="category-card">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label>Category</label>
        <button
          type="button"
          className="btn delete_btn"
          onClick={(e) => removeCategory(catIndex)}          
          title="Remove Category"
        >
          <RiDeleteBin6Line size={22} className="delete_icon" />
        </button>
      </div>

      <div className="row">
        <div className="col-md-8">
          <FormControl fullWidth size="small" className="mb-3">
            <InputLabel id={`category-label-${catIndex}`}>Category</InputLabel>
            <Select
              labelId={`category-label-${catIndex}`}
              value={cat.cat_name}
              label="Category"
              onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
            >
              <MenuItem value="">
                Select Category
              </MenuItem>
              {categoryOptions.map((opt, i) => (
                <MenuItem key={i} value={opt.toLowerCase()}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="col-md-4">
          <TextField
            label="Max Choice"
            variant="outlined"
            size="small"
            type="text"
            value={cat.choose}
            className="w-100 mb-3"
            onChange={(e) => handleChooseInputChange(catIndex, e.target.value)}
          />
        </div>
      </div>

      {cat.fields.map((field, fieldIndex) => (
        <FieldRow
          key={fieldIndex}
          catIndex={catIndex}
          fieldIndex={fieldIndex}
          field={field}
          handleFieldChange={handleFieldChange}
          removeField={removeField}
        />
      ))}

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => addField(catIndex)}
      >
        + Add Field
      </button>
    </div>
  );
};

export default CategoryCard;
