import React, { useState } from "react";
import restaurant_img from "../../../../assets/media/image/restaurant_img.png";
import "../../../../assets/styles/components/layout/ReserveForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useReservationForm from './useReservationForm';
import {Toast} from '../../../common/AlertService';
import { useAuth } from "../../../../context/AuthContext";
import { HiOutlineRefresh } from "react-icons/hi";

const ReserveForm = () => {

  const { 
    formData,
    handleinputChange,
    fetchCaptcha,
    captchaSvg,
    handleDateChange,
    handleTimeChange,
    handleSubmit
   }=useReservationForm();
   
   const {role} = useAuth();
  return (
    <>
    <Toast/>
    <div className="reserve-section">
      <div className="row m-0">
        <div className="col-lg-6 image-section p-0">
          <img
            src={restaurant_img}
            alt="Restaurant"
            className="reserve-img w-100"
          />
        </div>
        <div className="col-lg-6 p-3 p-md-5 form-section m-0">
          <div>
            <h2 className="reserve-heading">Reserve a Table</h2>
            <p className="reserve-description">
              Secure your reservation now and enjoy hassle-free, delightful
              culinary journey. We’ve got the perfect spot for you.
            </p>
          </div>
          <form action="">
            <div className="row p-0 m-0">
              <div className="col-12">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  className="me-2 input_style"
                  value={formData.full_name}
                  onChange={handleinputChange}
                  readOnly={role === "guest" ? false : true}
                  
                />
              </div>

              <div className="col-12">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="input_style"
                  value={formData.email}
                  onChange={handleinputChange}
                  readOnly={role === "guest" ? false : true}
                  
                  />
              </div>

              <div className="col-md-6">
                <input
                  type="tel"
                  name="phone_no"
                  placeholder="Phone Number"
                  className="input_style"
                  value={formData.phone_no}
                  onChange={handleinputChange}
                  
                />
              </div>

              <div className="col-md-6">
                <input type="number" placeholder="Number of Guests" className="input_style" />
              </div>
              {/* Date Picker */}
              <div className="col-md-3">
                <DatePicker
                  name="date"
                  selected={formData.date}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select Date"
                  className="select_date"
                  minDate={new Date()}
                />
              </div>

              {/* Time Picker */}
              <div className="col-md-3">
                <DatePicker
                  selected={formData.time}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select Time"
                  className="select_time"
                  minTime={new Date(new Date().setHours(16, 0, 0))} // 4:00 PM
                  maxTime={new Date(new Date().setHours(22, 0, 0))} // 10:00 PM
                />
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
                  onChange={handleinputChange}
                />

              </div>

              <div>
                <div className="col-12">
                  <button type="submit" className="reserve-btn" onClick={handleSubmit}>Reserve Now</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default ReserveForm;
