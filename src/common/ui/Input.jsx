import React from 'react';

/**
 * Reusable Input Component
 * @param {string} type - Input type (text, number, email, etc.)
 * @param {string} label - Input label
 * @param {string} name - Input name
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {string} error - Error message
 * @param {string} className - Additional CSS classes
 */
const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  disabled = false,
  className = '',
  ...props
}) => {
  const hasError = error && error.length > 0;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${hasError 
            ? 'border-red-500 focus:ring-red-400' 
            : 'border-gray-300 dark:border-gray-600'
          }
          dark:bg-gray-800 dark:text-white
        `}
        {...props}
      />
      
      {hasError && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;