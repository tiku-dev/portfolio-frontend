import React, { useId } from 'react';
import { Button, PrimaryButton, SecondaryButton } from './Button';

/**
 * Standard Form Input with rounded corners and accessible states.
 */
export function InputField({
  label,
  id,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  rounded = 'rounded-2xl', // Extra rounded corners (rounded-2xl: 16px)
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-rose-500 ml-1" aria-hidden="true">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-4 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full min-h-[48px] px-5 py-3 text-sm transition-all duration-200
            ${rounded}
            ${leftIcon ? 'pl-12' : ''}
            ${rightIcon ? 'pr-12' : ''}
            bg-white dark:bg-slate-900
            text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            border
            ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
            }
            focus:outline-none
            disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed
            shadow-xs
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-4 flex items-center pointer-events-none text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Standard Multi-line Textarea Field with rounded corners.
 */
export function TextareaField({
  label,
  id,
  name,
  rows = 4,
  placeholder = '',
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  rounded = 'rounded-2xl',
  className = '',
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
          {required && <span className="text-rose-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        id={inputId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={`
          w-full px-5 py-3.5 text-sm transition-all duration-200 resize-y
          ${rounded}
          bg-white dark:bg-slate-900
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          border
          ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
          }
          focus:outline-none
          disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed
          shadow-xs
        `}
        {...props}
      />

      {error ? (
        <p id={errorId} className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Standard Form Card showcasing rounded inputs and side-by-side Orange buttons (no black).
 */
export function StandardForm({ onSubmit, onReset, isSubmitting = false }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 md:p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-5"
    >
      <div>
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">Contact & Inquiry</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Have an engineering project or role? Send a direct transmission to the backend.
        </p>
      </div>

      <InputField
        label="Full Name"
        name="name"
        placeholder="e.g. Alex Mercer"
        required
      />

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="alex@example.com"
        helperText="We will never share your email with third parties."
        required
      />

      <TextareaField
        label="Message"
        name="message"
        placeholder="Tell me about your project, architecture needs, or role..."
        rows={4}
        required
      />

      {/* Side-by-side buttons: Primary (Solid Orange 500) and Secondary (Soft Orange Tint, no black!) */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* Button 1: Solid Orange 500 */}
        <PrimaryButton
          type="submit"
          size="md"
          isLoading={isSubmitting}
        >
          Send Message
        </PrimaryButton>

        {/* Button 2: Soft Orange Secondary (Clean non-black companion) */}
        <SecondaryButton
          type="button"
          size="md"
          onClick={onReset}
        >
          Cancel
        </SecondaryButton>
      </div>
    </form>
  );
}

export default StandardForm;
