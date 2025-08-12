import React from "react";

const ImageModal = ({ modalRef, previewImage }) => (
  <div
    className="modal fade"
    tabIndex="-1"
    ref={modalRef}
    id="previewModal"
    aria-labelledby="previewModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Uploaded Image</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body text-center">
          <img src={previewImage} alt="Full Preview" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default ImageModal;
