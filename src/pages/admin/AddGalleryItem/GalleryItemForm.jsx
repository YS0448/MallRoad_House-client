import React from "react";

const GalleryItemForm = ({
  formData,
  fileInputRef,
  onImageChange,
  onInputChange,
  onSubmit,
  onReset,
}) => {
  return (
    <div className="container-fluid container-sm my-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Add Gallery Item</h2>

        <form onSubmit={onSubmit}>
          {formData.preview && (
            <div className="mb-3 text-center">
              <img
                src={formData.preview}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxWidth: "250px" }}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">Select Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={onImageChange}
              ref={fileInputRef}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Image Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter image name"
              value={formData.image_name}
              onChange={(e) => onInputChange("image_name", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter image description"
              value={formData.description}
              onChange={(e) => onInputChange("description", e.target.value)}
            ></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryItemForm;
