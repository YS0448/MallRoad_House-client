// src/components/ForgotPassword/steps/EmailStep.jsx
import React from 'react';

const EmailStep = ({ email, setEmail, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send OTP</button>
    </form>
  );
};

export default EmailStep;
