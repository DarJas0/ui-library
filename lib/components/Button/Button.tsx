import React from "react";
import clsx from "clsx";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonAccent = "primary" | "secondary" | "neutral";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  accent?: ButtonAccent;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  label?: string;
}

const baseStyles = "inline-flex items-center justify-center font-bold font-sans rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95";

const sizeStyles: Record<ButtonSize, string> = {
  small: "px-4 py-1.5 text-xs gap-1.5",
  medium: "px-6 py-2.5 text-sm gap-2",
  large: "px-8 py-3.5 text-base gap-2.5",
};

const variantStyles: Record<ButtonVariant, Record<ButtonAccent, string>> = {
  solid: {
    primary: "bg-gradient-to-r from-primary to-primary-light text-white hover:opacity-90 focus:ring-primary/50 shadow-sm hover:shadow-md border-transparent",
    secondary: "bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary/50 shadow-sm hover:shadow-md border-transparent",
    neutral: "bg-gray-900 text-white hover:bg-black focus:ring-gray-900/50 shadow-sm hover:shadow-md border-transparent",
  },
  outline: {
    primary: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5 focus:ring-primary/50",
    secondary: "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary/5 focus:ring-secondary/50",
    neutral: "border-2 border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300/50",
  },
  ghost: {
    primary: "text-primary bg-transparent hover:bg-primary/10 focus:ring-primary/30",
    secondary: "text-secondary bg-transparent hover:bg-secondary/10 focus:ring-secondary/30",
    neutral: "text-gray-600 bg-transparent hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200/50",
  },
  link: {
    primary: "text-primary underline-offset-4 hover:underline p-0 h-auto bg-transparent focus:ring-0",
    secondary: "text-secondary underline-offset-4 hover:underline p-0 h-auto bg-transparent focus:ring-0",
    neutral: "text-gray-600 underline-offset-4 hover:underline hover:text-gray-900 p-0 h-auto bg-transparent focus:ring-0",
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  accent = "primary",
  size = "medium",
  block = false,
  loading = false,
  icon,
  iconPosition = "left",
  label,
  className,
  children,
  disabled,
  ...rest
}) => {
  const content = label || children;
  
  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant][accent],
        block && "w-full flex",
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{content}</span>
      {!loading && icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
