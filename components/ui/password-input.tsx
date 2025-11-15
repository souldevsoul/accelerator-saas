'use client';

import { useState, forwardRef, ChangeEvent } from 'react';
import FormField from './form-field';

interface PasswordInputProps {
  label?: string;
  id?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  showToggle?: boolean;
}

/**
 * Password input component with show/hide toggle functionality
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  label = 'Password',
  placeholder = 'Enter password',
  showToggle = true,
  id,
  name,
  value,
  onChange,
  error,
  required,
  disabled,
  className
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Eye icon for show password
  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 10.8334C5.5 4.16671 14.5 4.16671 17.5 10.8334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.1666C8.61929 14.1666 7.5 13.0473 7.5 11.6666C7.5 10.2859 8.61929 9.16663 10 9.16663C11.3807 9.16663 12.5 10.2859 12.5 11.6666C12.5 13.0473 11.3807 14.1666 10 14.1666Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Eye-off icon for hide password
  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 10.8334C5.5 4.16671 14.5 4.16671 17.5 10.8334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.1666C8.61929 14.1666 7.5 13.0473 7.5 11.6666C7.5 10.2859 8.61929 9.16663 10 9.16663C11.3807 9.16663 12.5 10.2859 12.5 11.6666C12.5 13.0473 11.3807 14.1666 10 14.1666Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 2L18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const toggleButton = showToggle ? (
    <button
      type="button"
      className="text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200"
      onClick={togglePasswordVisibility}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  ) : null;

  return (
    <FormField
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      label={label}
      placeholder={placeholder}
      rightElement={toggleButton}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;