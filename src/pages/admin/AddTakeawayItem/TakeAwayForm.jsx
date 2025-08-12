import React, { useRef } from "react";
import FoodDetails from "./FoodDetails";
import FormActions from "./FormActions";
import ImageModal from "./ImageModal";
import FoodImageSection from "./FoodImageSection";
import useTakeAwayForm from "./useTakeAwayForm";
import "../../../assets/styles/admin/TakeAway/TakeAwayForm.css";

const TakeAwayForm = () => {
  const {
    formData,
    handleChange,
    handleReset,
    handleSubmit,
    previewImage,
    selectedAllergens,        // Renamed
    setSelectedAllergens,     // Renamed
    openModal,
    modalRef
  } = useTakeAwayForm();

  return (
    <div className="takeaway-form container ">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title mb-4">Take Away Form</h2>
        <div className="row g-4">
          <div className="col-md-8">
            <FoodDetails
              formData={formData}
              handleChange={handleChange}
              selectedAllergens={selectedAllergens}         // Renamed
              setSelectedAllergens={setSelectedAllergens}   // Renamed
            />
          </div>

          <div className="col-md-4">
            <FoodImageSection
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

export default TakeAwayForm;
