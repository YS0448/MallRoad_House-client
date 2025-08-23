import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const ImageUploader = ({ mealImage, handleImageChange, removeImage }) => {
  return (
    <div className="form-group">
      <label>Set Meal Image</label>
      <div className="image-upload-box">
        {!mealImage ? (
          <label className="upload-label">
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            <span>📷 Upload Image</span>
          </label>
        ) : (
          <div className="image-preview">
            <img src={mealImage} alt="Set Meal" />
            <button type="button" className="remove-image" onClick={removeImage}>
              <IoCloseSharp size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
