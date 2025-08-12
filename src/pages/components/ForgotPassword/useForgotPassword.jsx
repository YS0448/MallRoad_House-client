// src/components/ForgotPassword/hooks/useForgotPassword.jsx
import { useState } from 'react';
import apiCall from '../../../api/apiCall';
import { showToast } from '../../common/AlertService';
import {useNavigate} from 'react-router-dom';

const useForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email');
      return;
    }

    try {
        setIsLoading(true);
      const res = await apiCall('POST', '/auth/send-otp', { email });
      if (res.status === 200) {
        setStep(2);
        setError('');
        setSuccessMsg('');
        showToast('success', 'OTP sent to your email.');
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    }finally {
        setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('Enter OTP');
      return;
    }

    try {
        setIsLoading(true);
      const res = await apiCall('POST', '/auth/verify-otp', { email, otp });
      if (res.status === 200) {
        setStep(3);
        setError('');
        setSuccessMsg('');
        showToast('success', 'OTP verified. You can now set a new password.');
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    }finally{
        setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
        setIsLoading(true);
      const res = await apiCall('POST', '/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      if (res.status === 200) {
        showToast('success', 'Password reset successfully. You can now log in.');
        setError('');
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
        setSuccessMsg('');
        
        setTimeout(() => {
            navigate('/login');
        }, 2000); // 2 second delay        
        
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    }finally {
        setIsLoading(false);
    }
  };

  return {
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
    handleResetPassword,    
  };
};

export default useForgotPassword;
