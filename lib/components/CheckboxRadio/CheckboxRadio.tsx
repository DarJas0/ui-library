import React from "react";
import clsx from "clsx";

export type ControlAccent = "primary" | "secondary" | "neutral";

const accentStyles: Record<ControlAccent, string> = {
  primary: "text-primary focus:ring-primary/40 border-gray-300 checked:bg-primary checked:border-primary",
  secondary: "text-secondary focus:ring-secondary/40 border-gray-300 checked:bg-secondary checked:border-secondary",
  neutral: "text-gray-900 focus:ring-gray-500/40 border-gray-300 checked:bg-gray-900 checked:border-gray-900",
};

interface BaseProps {
  label?: string;
  accent?: ControlAccent;
  helperText?: string;
  className?: string;
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "color">, BaseProps {}
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "color">, BaseProps {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ id, label, helperText, accent = "secondary", className, disabled, ...rest }, ref) {
  const inputId = id || React.useId();
  const describedBy = helperText ? `${inputId}-help` : undefined;
  return (
    <div className={clsx("flex flex-col gap-1", className)}> 
      <label className={clsx("inline-flex items-start gap-2.5 text-sm cursor-pointer", disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700")}>
        <div className="relative flex items-center mt-0.5">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            disabled={disabled}
            aria-describedby={describedBy}
            className={clsx(
              "peer h-4 w-4 appearance-none rounded border bg-white transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1",
              accentStyles[accent],
              disabled && "bg-gray-100 border-gray-200 checked:bg-gray-400 checked:border-gray-400"
            )}
            {...rest}
          />
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.5L3.5 7L9 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="select-none font-medium">{label}</span>
      </label>
      {helperText && (
        <p id={describedBy} className="text-xs text-gray-500 ml-7">{helperText}</p>
      )}
    </div>
  );
});

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio({ id, label, helperText, accent = "secondary", className, disabled, name, ...rest }, ref) {
  const inputId = id || React.useId();
  const describedBy = helperText ? `${inputId}-help` : undefined;
  return (
    <div className={clsx("flex flex-col gap-1", className)}> 
      <label className={clsx("inline-flex items-start gap-2.5 text-sm cursor-pointer", disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700")}>
        <div className="relative flex items-center mt-0.5">
          <input
            id={inputId}
            ref={ref}
            type="radio"
            name={name}
            disabled={disabled}
            aria-describedby={describedBy}
            className={clsx(
              "peer h-4 w-4 appearance-none rounded-full border bg-white transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1",
              accentStyles[accent],
              disabled && "bg-gray-100 border-gray-200 checked:bg-gray-400 checked:border-gray-400"
            )}
            {...rest}
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
        </div>
        <span className="select-none font-medium">{label}</span>
      </label>
      {helperText && (
        <p id={describedBy} className="text-xs text-gray-500 ml-7">{helperText}</p>
      )}
    </div>
  );
});
