// src/components/ForgotPassword/steps/OtpStep.jsx
import React from 'react';

const OtpStep = ({ otp, setOtp, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default OtpStep;
