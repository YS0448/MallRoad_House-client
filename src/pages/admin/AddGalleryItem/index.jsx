import React from "react";
import { Toast } from "../../common/AlertService";
import GalleryItemForm from "./GalleryItemForm";
import useGalleryItemForm from "./useGalleryItemForm";

const AddGalleryItem = () => {
  const {
    formDataState,
    fileInputRef,
    handleImageChange,
    handleInputChange,
    handleSubmit,
    reset    
  } = useGalleryItemForm();

  return (
    <>
      <Toast />
      <GalleryItemForm
        formData={formDataState}
        fileInputRef={fileInputRef}
        onImageChange={handleImageChange}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onReset={reset}
      />
    </>
  );
};

export default AddGalleryItem;
