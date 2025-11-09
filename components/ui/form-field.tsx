'use client';

import { forwardRef, ChangeEvent, ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  id?: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  placeholder?: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  rightElement?: ReactNode;
  description?: string;
  autoComplete?: string;
}

/**
 * Reusable form field component with label, input, and error handling
 */
const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  label,
  id,
  name,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  error = '',
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  rightElement,
  description = '',
  autoComplete
}, ref) => {
  // Base input classes
  const baseInputClasses = 'py-2 px-4 h-11 w-full text-gray-500 placeholder-gray-500 bg-gray-50 bg-opacity-40 border rounded-lg shadow-sm outline-none ring ring-transparent transition-colors duration-200';

  // Error state classes
  const errorClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-200 focus:border-yellowGreen-500 focus:ring-yellowGreen-500';

  // Disabled state classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Right element padding
  const rightElementPadding = rightElement ? 'pr-12' : '';

  // Combine input classes
  const inputClasses = `${baseInputClasses} ${errorClasses} ${disabledClasses} ${rightElementPadding} ${inputClassName}`.trim();

  // Generate unique IDs if not provided
  const fieldId = id || `field-${String(name)}`;
  const errorId = `${fieldId}-error`;
  const descriptionId = `${fieldId}-description`;

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor={fieldId}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Input container for relative positioning */}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          id={fieldId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${error ? errorId : ''} ${description ? descriptionId : ''}`.trim() || undefined}
          autoComplete={autoComplete}
        />

        {/* Right element (like password toggle) */}
        {rightElement && (
          <div className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={errorId}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Description/helper text */}
      {description && !error && (
        <p
          id={descriptionId}
          className="mt-1 text-sm text-gray-500"
        >
          {description}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;