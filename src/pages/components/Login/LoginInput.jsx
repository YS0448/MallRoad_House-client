import React from 'react';

const LoginInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  showToggle = false,
  showPassword = false,
  togglePasswordVisibility = () => {},
}) => {
  const inputType = showToggle && showPassword ? 'text' : type;

  return (
    <div className="login-input">
      <label>{label}</label>
      <div className="password-input-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          
          className={error ? 'input-error' : ''}
        />
        {showToggle && (
          <span
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
            style={{ cursor: 'pointer', marginLeft: '8px' }}
          >
            {showPassword ? '🔓' : '🔒'}
          </span>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LoginInput;
