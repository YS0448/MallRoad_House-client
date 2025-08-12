import React from 'react'

const SignupInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  showToggle,
  showPassword,
  togglePasswordVisibility
}) => {
  return (
    <div className="signup-input">
      <label>{label}</label>
      <div className="password-input-wrapper">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          
        />
        {showToggle && (
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? '🔓' : '🔒'}
          </span>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SignupInput;
