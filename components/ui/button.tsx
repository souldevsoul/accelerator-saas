'use client';

import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'default' | 'large';
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}

/**
 * Reusable Button component with multiple variants and states
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'default',
  children,
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  // Base button classes
  const baseClasses = 'group relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed';

  // Size variants
  const sizeClasses = {
    small: 'px-3 h-8 text-sm',
    default: 'px-5 h-12 text-base',
    large: 'px-6 h-14 text-lg'
  };

  // Style variants
  const variantClasses = {
    primary: 'text-white bg-gradient-to-br from-cyanGreen-800 to-cyan-800 hover:from-cyanGreen-900 hover:to-cyan-900 focus:ring-cyanGreen-500 rounded-lg',
    secondary: 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-yellowGreen-600 focus:ring-yellowGreen-500 shadow-sm hover:shadow-none rounded-lg',
    outline: 'text-yellowGreen-700 bg-transparent border border-yellowGreen-600 hover:bg-yellowGreen-50 focus:ring-yellowGreen-500 rounded-lg',
    ghost: 'text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500 rounded-lg'
  };

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className}`.trim();

  // Handle loading state
  const isDisabled = disabled || loading;

  // Render icon
  const renderIcon = () => {
    if (loading) {
      return (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    }
    return icon;
  };

  const iconElement = renderIcon();
  const hasIcon = iconElement && !loading;
  const iconSpacing = hasIcon ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={loading}
      {...props}
    >
      {/* Ring animation for primary buttons */}
      {variant === 'primary' && !loading && (
        <div className="absolute top-0 left-0 w-full h-full rounded-lg ring-4 ring-green-300 animate-pulse group-hover:ring-0 transition duration-300"></div>
      )}

      {/* Icon on left */}
      {iconElement && iconPosition === 'left' && (
        <span className={iconSpacing} aria-hidden="true">
          {iconElement}
        </span>
      )}

      {/* Button text */}
      <span className="relative">
        {loading ? 'Loading...' : children}
      </span>

      {/* Icon on right */}
      {iconElement && iconPosition === 'right' && (
        <span className={iconSpacing} aria-hidden="true">
          {iconElement}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };