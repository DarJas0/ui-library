import React from "react";
import clsx from "clsx";

type InputSize = "small" | "medium" | "large";
type InputVariant = "default" | "error" | "success";
type InputColor = "purple" | "red";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  label?: string;
  helperText?: string;
  size?: InputSize;
  variant?: InputVariant;
  color?: InputColor;
}

const sizeClasses: Record<InputSize, string> = {
  small: "h-9 text-xs px-3",
  medium: "h-10 text-sm px-3.5",
  large: "h-11 text-base px-4",
};

const borderByColor: Record<InputColor, string> = {
  purple: "border-[#4C28D3]/50 focus:border-[#4C28D3] focus:ring-[#4C28D3]/50",
  red: "border-[#FF5050]/50 focus:border-[#FF5050] focus:ring-[#FF5050]/50",
};

const variantBorder: Record<Exclude<InputVariant, 'default'>, string> = {
  success: "border-green-400",
  error: "border-red-400",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    helperText,
    size = "medium",
    variant = "default",
    color = "purple",
    className,
    disabled,
    ...rest
  },
  ref
) {
  const inputId = id || React.useId();
  const describedBy = helperText ? `${inputId}-help` : undefined;

  return (
    <div className={clsx("flex w-full flex-col gap-1")}> 
      {label && (
        <label htmlFor={inputId} className={clsx("text-sm font-medium", disabled ? "text-gray-400" : "text-gray-800")}>{label}</label>
      )}
      <input
        id={inputId}
        ref={ref}
        disabled={disabled}
        aria-describedby={describedBy}
        className={clsx(
          "block w-full rounded-lg border bg-white shadow-sm outline-none transition focus:ring-2 placeholder:text-gray-400",
          sizeClasses[size],
          variant === "default" ? borderByColor[color] : variantBorder[variant as Exclude<InputVariant,'default'>],
          variant === "success" && "focus:ring-green-400",
          variant === "error" && "focus:ring-red-400",
          disabled && "cursor-not-allowed bg-gray-100 text-gray-500 border-gray-200",
          className
        )}
        {...rest}
      />
      {helperText && (
        <p id={describedBy} className={clsx("text-xs", variant === "error" ? "text-red-600" : variant === "success" ? "text-green-600" : "text-gray-600")}>{helperText}</p>
      )}
    </div>
  );
});

export default Input;

