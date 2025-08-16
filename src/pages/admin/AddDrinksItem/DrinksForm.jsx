import React, { useRef } from "react";
import DrinksDetails from "./DrinksDetails";
import FormActions from "./FormActions";
import ImageModal from "./ImageModal";
import DrinkImageSection from "./DrinksImageSection";
import useDrinksForm from "./useDrinksForm";
import "../../../assets/styles/admin/TakeAway/TakeAwayForm.css";

const DrinksForm = () => {
  const {
    formData,
    handleChange,
    handleReset,
    handleSubmit,
    previewImage,
    openModal,
    modalRef,
    categoryOptions
  } = useDrinksForm();

  return (
    <div className="takeaway-form container ">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title mb-4">Drinks Form</h2>
        <div className="row g-4">
          <div className="col-md-8">
            <DrinksDetails
              formData={formData}
              handleChange={handleChange}
              categoryOptions={categoryOptions}
            />
          </div>

          <div className="col-md-4">
            <DrinkImageSection
              handleChange={handleChange}
              previewImage={previewImage}
              openModal={openModal}              
            />
          </div>

          <FormActions handleReset={handleReset} />
        </div>
      </form>

      <ImageModal modalRef={modalRef} previewImage={previewImage} />
    </div>
  );
};

export default DrinksForm;
