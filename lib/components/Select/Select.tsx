import React from "react";
import clsx from "clsx";

export type SelectSize = "small" | "medium" | "large";
export type SelectVariant = "default" | "error" | "success";
export type SelectAccent = "primary" | "secondary" | "neutral";

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "color"> {
  label?: string;
  helperText?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  accent?: SelectAccent;
}

const sizeClasses: Record<SelectSize, string> = {
  small: "h-9 text-xs pl-3 pr-8",
  medium: "h-10 text-sm pl-3.5 pr-9",
  large: "h-11 text-base pl-4 pr-10",
};

const accentStyles: Record<SelectAccent, string> = {
  primary: "focus:border-primary focus:ring-primary/20",
  secondary: "focus:border-secondary focus:ring-secondary/20",
  neutral: "focus:border-gray-500 focus:ring-gray-500/20",
};

const variantStyles: Record<SelectVariant, string> = {
  default: "border-gray-300",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500/20 text-green-900",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    id,
    label,
    helperText,
    size = "medium",
    variant = "default",
    accent = "secondary",
    className,
    disabled,
    children,
    ...rest
  },
  ref
) {
  const selectId = id || React.useId();
  const describedBy = helperText ? `${selectId}-help` : undefined;

  return (
    <div className={clsx("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={selectId} className={clsx("text-sm font-medium", disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-200")}>{label}</label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          aria-describedby={describedBy}
          className={clsx(
            "block w-full appearance-none rounded-lg border bg-white dark:bg-gray-900 shadow-sm outline-none transition-all duration-200 focus:ring-4 dark:text-white",
            sizeClasses[size],
            variant === "default" ? accentStyles[accent] : "",
            variantStyles[variant],
            "border-gray-300 dark:border-gray-700",
            disabled && "cursor-not-allowed bg-gray-50 text-gray-500 border-gray-200 shadow-none"
          )}
          {...rest}
        >
          {children}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
      {helperText && (
        <p id={describedBy} className={clsx("text-xs", variant === "error" ? "text-red-600" : variant === "success" ? "text-green-600" : "text-gray-500")}>{helperText}</p>
      )}
    </div>
  );
});

export default Select;


