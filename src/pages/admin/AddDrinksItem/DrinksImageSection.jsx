import React, { useRef } from "react";
import { FaCamera, FaEye } from "react-icons/fa";

const DrinksImageSection = ({ handleChange, previewImage, openModal }) => {
  const fileInputRef = useRef(null);

  const onFileChange = (e) => {
    handleChange(e);
    // Allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="card shadow p-3">
      <h5 className="section-title text-center">Food Image</h5>

      <div className="upload-wrapper mb-3">
        <input
          type="file"
          accept="image/*"
          name="image"
          id="image-upload"
          className="d-none"
          ref={fileInputRef}
          onChange={onFileChange}
        />

        {!previewImage ? (
          <label htmlFor="image-upload" className="upload-label">
            <div className="food-image-placeholder">
              <FaCamera className="icon" />
              <p className="text-muted mb-0">Click to upload</p>
            </div>
          </label>
        ) : (
          <>
            <div
              className="image-preview-container"
              onClick={openModal}
              style={{ cursor: "pointer" }}
            >
              <img
                src={previewImage}
                alt="Preview"
                className="food-image-preview"
              />
            </div>

            <p
              className="preview-hint text-center mt-2"
              onClick={openModal}
              style={{ cursor: "pointer" }}
            >
              <FaEye className="me-1" />
              Click image to preview
            </p>

            <p
              className="change-image text-center text-primary mt-1"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={triggerFileSelect} // 👈 Open file picker
            >
              <FaCamera className="me-1" />
              Change Image
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DrinksImageSection;
