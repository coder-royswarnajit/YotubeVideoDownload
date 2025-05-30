import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

// Variant styles
const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 dark:bg-secondary-700 dark:hover:bg-secondary-600',
  success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 dark:bg-success-700 dark:hover:bg-success-600',
  danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 dark:bg-error-700 dark:hover:bg-error-600',
  warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500 dark:bg-warning-700 dark:hover:bg-warning-600',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-200 dark:hover:bg-gray-700',
  link: 'text-primary-600 underline hover:text-primary-700 focus:ring-primary-500 dark:text-primary-400 dark:hover:text-primary-300',
};

// Size styles
const sizes = {
  xs: 'px-2.5 py-1.5 text-xs rounded',
  sm: 'px-3 py-2 text-sm leading-4 rounded-md',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-md',
  xl: 'px-8 py-4 text-lg rounded-md',
};

// Button states
const disabledStyles = 'opacity-50 cursor-not-allowed';
const loadingStyles = 'opacity-70 cursor-wait';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      className = '',
      children,
      leftIcon,
      rightIcon,
      href,
      target,
      rel,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    // Base button styles
    const baseStyles = 'inline-flex items-center justify-center font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out';
    
    // Combine all styles
    const buttonStyles = `
      ${baseStyles} 
      ${variants[variant]} 
      ${sizes[size]} 
      ${disabled ? disabledStyles : ''} 
      ${isLoading ? loadingStyles : ''} 
      ${className}
    `.trim();

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg 
        className="mr-2 h-4 w-4 animate-spin text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // If href is provided, render an anchor tag that looks like a button
    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={buttonStyles}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {isLoading && <LoadingSpinner />}
          {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </a>
      );
    }

    // Otherwise render a regular button
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={buttonStyles}
        {...rest}
      >
        {isLoading && <LoadingSpinner />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;