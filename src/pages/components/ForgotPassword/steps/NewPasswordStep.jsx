// src/components/ForgotPassword/steps/NewPasswordStep.jsx
import React from 'react';

const NewPasswordStep = ({ newPassword, setNewPassword, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        minLength={6}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default NewPasswordStep;
