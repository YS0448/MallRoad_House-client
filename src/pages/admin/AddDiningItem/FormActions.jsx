import React from "react";

const FormActions = ({ handleReset }) => (
  <div className="col-12 d-flex justify-content-center gap-2 mt-5">
    <button type="reset" className="btn btn-secondary" onClick={handleReset}>
      Reset
    </button>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </div>
);

export default FormActions;
