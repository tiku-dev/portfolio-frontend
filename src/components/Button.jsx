import React from 'react';

/**
 * Standard Button component configured for the chosen Orange theme.
 * 
 * Variants:
 * - 'primary': Solid Orange 500 button (main call to action)
 * - 'secondary': Soft Orange-tinted button (no black) designed to sit beside 
 *   the primary button with clear visual hierarchy without clashing.
 * - 'outline': Crisp Orange border button
 * - 'ghost': Subtle Orange text button with gentle hover fill
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  // Orange theme variants (no black alongside)
  const variants = {
    // Primary Solid Orange 500
    primary:
      'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 focus-visible:ring-orange-500 shadow-sm hover:shadow-md',
    // Secondary Soft Orange (pairs cleanly beside the solid orange button without any black)
    secondary:
      'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 active:bg-orange-200 focus-visible:ring-orange-500 shadow-xs dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/80 dark:hover:bg-orange-900/50',
    // Outline variant
    outline:
      'border-2 border-orange-500 text-orange-600 dark:text-orange-400 bg-transparent hover:bg-orange-50 dark:hover:bg-orange-950/40 focus-visible:ring-orange-500',
    // Ghost variant
    ghost:
      'text-orange-600 dark:text-orange-400 bg-transparent hover:bg-orange-50 dark:hover:bg-orange-950/40 focus-visible:ring-orange-500',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg min-h-[36px] gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl min-h-[44px] gap-2',
    lg: 'text-base px-6 py-3.5 rounded-xl min-h-[48px] gap-2.5',
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.md;
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${selectedVariant} ${selectedSize} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}

      <span>{children}</span>

      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}

// Convenient explicit exports
export function PrimaryButton(props) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props) {
  return <Button variant="secondary" {...props} />;
}

export default Button;
