import React from "react";
import clsx from "clsx";

export type InputSize = "small" | "medium" | "large";
export type InputVariant = "default" | "error" | "success";
export type InputAccent = "primary" | "secondary" | "neutral";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  label?: string;
  helperText?: string;
  size?: InputSize;
  variant?: InputVariant;
  accent?: InputAccent;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const sizeClasses: Record<InputSize, string> = {
  small: "h-9 text-xs px-3",
  medium: "h-10 text-sm px-3.5",
  large: "h-11 text-base px-4",
};

const accentStyles: Record<InputAccent, string> = {
  primary: "focus:border-primary focus:ring-primary/20",
  secondary: "focus:border-secondary focus:ring-secondary/20",
  neutral: "focus:border-gray-500 focus:ring-gray-500/20",
};

const variantStyles: Record<InputVariant, string> = {
  default: "border-gray-300",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500/20 text-green-900 placeholder:text-green-400",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 placeholder:text-red-400",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    helperText,
    size = "medium",
    variant = "default",
    accent = "secondary",
    icon,
    iconPosition = "left",
    className,
    disabled,
    ...rest
  },
  ref
) {
  const inputId = id || React.useId();
  const describedBy = helperText ? `${inputId}-help` : undefined;

  return (
    <div className={clsx("flex w-full flex-col gap-1.5", className)}> 
      {label && (
        <label htmlFor={inputId} className={clsx("text-sm font-medium", disabled ? "text-gray-400" : "text-gray-700")}>{label}</label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          aria-describedby={describedBy}
          className={clsx(
            "block w-full rounded-lg border bg-white shadow-sm outline-none transition-all duration-200 focus:ring-4",
            sizeClasses[size],
            variant === "default" ? accentStyles[accent] : "",
            variantStyles[variant],
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            disabled && "cursor-not-allowed bg-gray-50 text-gray-500 border-gray-200 shadow-none"
          )}
          {...rest}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {helperText && (
        <p id={describedBy} className={clsx("text-xs", variant === "error" ? "text-red-600" : variant === "success" ? "text-green-600" : "text-gray-500")}>{helperText}</p>
      )}
    </div>
  );
});

export default Input;


