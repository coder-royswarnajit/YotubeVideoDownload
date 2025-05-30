import React, { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = '',
      options,
      label,
      helperText,
      error = false,
      fullWidth = false,
      size = 'md',
      id,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    // Generate a random ID if not provided
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    // Size styles
    const sizeStyles = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-3 text-lg',
    };

    // Base styles
    const containerStyles = `${fullWidth ? 'w-full' : ''} ${className}`;
    
    const selectStyles = `
      block rounded-md shadow-sm appearance-none pl-3 pr-10 
      focus:outline-none focus:ring-primary-500 focus:border-primary-500 
      ${sizeStyles[size]}
      ${error
        ? 'border-error-300 text-error-900 placeholder-error-400 focus:ring-error-500 focus:border-error-500 dark:border-error-600 dark:text-error-100'
        : 'border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'}
      ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900' : ''}
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
          <label htmlFor={selectId} className={labelStyles}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={selectStyles}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={helperText ? `${selectId}-helper-text` : undefined}
            {...rest}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {helperText && (
          <p id={`${selectId}-helper-text`} className={helperTextStyles}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;