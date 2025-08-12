import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/styles/customer/Checkout/CheckoutForm.css";

const CheckoutForm = ({ formData, onFormChange, onPlaceOrder }) => {
  // Destructure fields for convenience
  const { fullName, phoneNumber, email, pinCode, address, landmark } = formData;

  // Input change handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    onFormChange(id, value);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h3 className="mb-4 text-primary fw-bold text-center">Shipping Address</h3>
        <form onSubmit={onPlaceOrder}>
          <div className="row g-3">
            {/* Full Name */}
            <div className="col-12">
              <label htmlFor="fullName" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter full name"
                value={fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="col-12">
              <label htmlFor="phoneNumber" className="form-label fw-semibold">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="col-12">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pin Code */}
            <div className="col-md-6">
              <label htmlFor="pinCode" className="form-label fw-semibold">
                Pin Code
              </label>
              <select
                className="form-select"
                id="pinCode"
                value={pinCode}
                onChange={handleChange}
                required
              >
                <option value="">Select Pin Code</option>
                <option value="G64">G64</option>
                <option value="G21">G21</option>
                <option value="G33">G33</option>
                <option value="G66">G66</option>
                <option value="G22">G22</option>
              </select>
            </div>

            {/* Address */}
            <div className="col-12">
              <label htmlFor="address" className="form-label fw-semibold">
                Address
              </label>
              <textarea
                id="address"
                className="form-control"
                placeholder="Enter Address..."
                value={address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Landmark */}
            <div className="col-12">
              <label htmlFor="landmark" className="form-label fw-semibold">
                Landmark
              </label>
              <input
                type="text"
                className="form-control"
                id="landmark"
                placeholder="Enter landmark"
                value={landmark}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="col-12 d-grid">
              <button type="submit" className="btn btn-lg rounded-5 btn-place-order">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
