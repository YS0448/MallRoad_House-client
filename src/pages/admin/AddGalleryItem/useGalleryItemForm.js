import { useRef, useState } from "react";
import apiCall from "../../../api/apiCall";
import { showToast } from "../../common/AlertService";

const initialState = {
  image: null,
  preview: null,
  image_name: "",
  description: "",
};

const useGalleryItemForm = () => {
  const [formDataState, setFormDataState] = useState(initialState);
  const fileInputRef = useRef(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormDataState((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormDataState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { image, image_name, description } = formDataState;

    if (!image || !image_name || !description) {
      showToast("error", "All fields are required");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", image);
    uploadData.append("image_name", image_name);
    uploadData.append("description", description);

    try {
      await apiCall("POST", "admin/gallery/add", uploadData);
      showToast("success", "Gallery item added successfully!");
      setFormDataState(initialState);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("error", "Failed to upload image. Please try again.");
    }
  };

  const reset = () => {
    setFormDataState(initialState);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input
    }
  };

  return {
    formDataState,
    fileInputRef,
    handleImageChange,
    handleInputChange,
    handleSubmit,
    reset,
  };
};

export default useGalleryItemForm;
