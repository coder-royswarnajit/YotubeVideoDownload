import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      helperText,
      error = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      id,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    // Generate a random ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Base styles
    const containerStyles = `${fullWidth ? 'w-full' : ''} ${className}`;
    
    const inputStyles = `
      block rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 
      ${error
        ? 'border-error-300 text-error-900 placeholder-error-400 focus:ring-error-500 focus:border-error-500 dark:border-error-600 dark:text-error-100'
        : 'border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'}
      ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900' : ''}
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
      ${fullWidth ? 'w-full' : ''}
    `;

    const labelStyles = `
      block text-sm font-medium ${
        error
          ? 'text-error-700 dark:text-error-300'
          : 'text-gray-700 dark:text-gray-200'
      } mb-1
    `;

    const helperTextStyles = `
      mt-1 text-sm ${
        error
          ? 'text-error-600 dark:text-error-400'
          : 'text-gray-500 dark:text-gray-400'
      }
    `;

    return (
      <div className={containerStyles}>
        {label && (
          <label htmlFor={inputId} className={labelStyles}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputStyles}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={helperText ? `${inputId}-helper-text` : undefined}
            {...rest}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p id={`${inputId}-helper-text`} className={helperTextStyles}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;