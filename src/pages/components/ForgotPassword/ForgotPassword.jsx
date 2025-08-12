import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/components/ForgotPassword/ForgotPassword.css';
import { Toast } from '../../common/AlertService';
import EmailStep from './steps/EmailStep';
import OtpStep from './steps/OtpStep';
import NewPasswordStep from './steps/NewPasswordStep';
import useForgotPassword from './useForgotPassword';
import Loader from '../../common/Loader';
const ForgotPassword = () => {
  const {
    step,
    email,
    otp,
    newPassword,
    error,
    successMsg,
    isLoading,
    setEmail,
    setOtp,
    setNewPassword,
    handleSendOtp,
    handleVerifyOtp,
    handleResetPassword
  } = useForgotPassword();

  return (
    <>
      <Toast />
      {isLoading && <Loader />}
      <div className="forgot-password-wrapper">
      <div className="forgot-password-container ">    
        <h2>Forgot Password</h2>
        <p>Follow the steps to reset your password securely.</p>

        {successMsg && <div className="success-message">{successMsg}</div>}
        {error && <div className="error-message">{error}</div>}

        {step === 1 && (
          <EmailStep 
            email={email} 
            setEmail={setEmail} 
            onSubmit={handleSendOtp} 
          />
        )}

        {step === 2 && (
          <OtpStep 
            otp={otp} 
            setOtp={setOtp} 
            onSubmit={handleVerifyOtp} 
          />
        )}

        {step === 3 && (
          <NewPasswordStep 
            newPassword={newPassword} 
            setNewPassword={setNewPassword} 
            onSubmit={handleResetPassword} 
          />
        )}

        <div className="back-to-login">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default ForgotPassword;
