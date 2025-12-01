import React from "react";
import clsx from "clsx";

type SelectSize = "small" | "medium" | "large";
type SelectColor = "purple" | "red";

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "color"> {
  label?: string;
  helperText?: string;
  size?: SelectSize;
  color?: SelectColor;
}

const sizeClasses: Record<SelectSize, string> = {
  small: "h-9 text-xs pl-3 pr-8",
  medium: "h-10 text-sm pl-3.5 pr-9",
  large: "h-11 text-base pl-4 pr-10",
};

const ringByColor: Record<SelectColor, string> = {
  purple: "focus:ring-[#4C28D3]/50 focus:border-[#4C28D3]",
  red: "focus:ring-[#FF5050]/50 focus:border-[#FF5050]",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, label, helperText, size = "medium", color = "purple", className, disabled, children, ...rest },
  ref
) {
  const selectId = id || React.useId();
  const describedBy = helperText ? `${selectId}-help` : undefined;

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className={clsx("text-sm font-medium", disabled ? "text-gray-400" : "text-gray-800")}>{label}</label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          aria-describedby={describedBy}
          className={clsx(
            "block w-full appearance-none rounded-lg border border-gray-300 bg-white shadow-sm outline-none transition focus:ring-2",
            sizeClasses[size],
            ringByColor[color],
            disabled && "cursor-not-allowed bg-gray-100 text-gray-500 border-gray-200",
            className
          )}
          {...rest}
        >
          {children}
        </select>
        {/* chevron */}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
      {helperText && (
        <p id={describedBy} className="text-xs text-gray-600">{helperText}</p>
      )}
    </div>
  );
});

export default Select;


