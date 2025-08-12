import React, { useState } from "react";
import calling_img from "../../../assets/media/image/calling_img3.png";
import "../../../assets/styles/customer/Contact/ContactUsForm.css";
import { useAuth } from "../../../context/AuthContext";
import { HiOutlineRefresh } from "react-icons/hi";

const ContactUsForm = ({
  handleInputChange,
  handleCaptchaChange,
  formData,
  handleSubmit,
  role,
  captchaSvg,
  fetchCaptcha,
}) => {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 contactUsImgSection d-flex justify-content-center align-items-center">
            <img src={calling_img} alt="" className="w-100" />
          </div>
          <div className="col-md-6 contactUsForm">
            <h2 className="formTitle">Leave a Message</h2>
            <form action="">
              <div className="">
                <label htmlFor="" className="labelText">
                  Name*
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="input_style"
                  readOnly={role === "guest" ? false : true}
                />
              </div>
              <div>
                <label htmlFor="" className="labelText">
                  Email ID*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID"
                  className="input_style"
                  readOnly={role === "guest" ? false : true}
                />
              </div>
              <div>
                <label htmlFor="" className="labelText">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="input_style"
                />
              </div>
              <div>
                <label htmlFor="" className="labelText">
                  Message*
                </label>
                <textarea
                  id=""
                  name="message"
                  value={formData.message}
                  className="textareaField"
                  onChange={handleInputChange}
                ></textarea>
              </div>


              {/* CAPTCHA */}
                <div className="captcha-section mt-5">

                  <div className="d-flex mb-2">
                      <div
                          className="captcha-image"
                          dangerouslySetInnerHTML={{ __html: captchaSvg }}
                      />
                      <div className=" refresh_icon">
                          <HiOutlineRefresh onClick={fetchCaptcha} />
                      </div>
                  </div>                

                <input
                  type="text"
                  name="captcha_answer"
                  placeholder="Enter CAPTCHA"
                  className="captcha-input"
                  value={formData.captcha_answer}
                  onChange={handleInputChange}
                />

              </div>

              <button
                type="submit"
                className="submitButton"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactUsForm;
