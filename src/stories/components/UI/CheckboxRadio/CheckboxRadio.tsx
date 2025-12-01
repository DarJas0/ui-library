import React from "react";
import clsx from "clsx";

export type ControlColor = "purple" | "red";

const ringByColor: Record<ControlColor, string> = {
  purple: "text-[#4C28D3] focus:ring-[#4C28D3]/40",
  red: "text-[#FF5050] focus:ring-[#FF5050]/40",
};

interface BaseProps {
  label?: string;
  color?: ControlColor;
  helperText?: string;
  className?: string;
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "color">, BaseProps {}
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "color">, BaseProps {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ id, label, helperText, color = "purple", className, disabled, ...rest }, ref) {
  const inputId = id || React.useId();
  const describedBy = helperText ? `${inputId}-help` : undefined;
  return (
    <div className={clsx("flex flex-col gap-1")}> 
      <label className={clsx("inline-flex items-center gap-2 text-sm", disabled ? "text-gray-400" : "text-gray-800")}>
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          disabled={disabled}
          aria-describedby={describedBy}
          className={clsx(
            "h-4 w-4 rounded border-gray-300 text-current outline-none focus:ring-2",
            ringByColor[color],
            disabled && "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200",
            className
          )}
          {...rest}
        />
        {label}
      </label>
      {helperText && (
        <p id={describedBy} className="text-xs text-gray-600 ml-6">{helperText}</p>
      )}
    </div>
  );
});

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio({ id, label, helperText, color = "purple", className, disabled, name, ...rest }, ref) {
  const inputId = id || React.useId();
  const describedBy = helperText ? `${inputId}-help` : undefined;
  return (
    <div className={clsx("flex flex-col gap-1")}> 
      <label className={clsx("inline-flex items-center gap-2 text-sm", disabled ? "text-gray-400" : "text-gray-800")}>
        <input
          id={inputId}
          ref={ref}
          type="radio"
          name={name}
          disabled={disabled}
          aria-describedby={describedBy}
          className={clsx(
            "h-4 w-4 rounded-full border-gray-300 text-current outline-none focus:ring-2",
            ringByColor[color],
            disabled && "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200",
            className
          )}
          {...rest}
        />
        {label}
      </label>
      {helperText && (
        <p id={describedBy} className="text-xs text-gray-600 ml-6">{helperText}</p>
      )}
    </div>
  );
});
