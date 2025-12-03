import React from "react";
import clsx from "clsx";

export type BadgeVariant = "soft" | "solid" | "outline";
export type BadgeAccent = "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral";
export type BadgeSize = "small" | "medium";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  accent?: BadgeAccent;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-full whitespace-nowrap transition-colors duration-200";

const sizeStyles: Record<BadgeSize, string> = {
  small: "text-[10px] leading-3 px-2 py-0.5 gap-1",
  medium: "text-xs leading-4 px-2.5 py-1 gap-1.5",
};

const variantStyles: Record<BadgeVariant, Record<BadgeAccent, string>> = {
  soft: {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    neutral: "bg-gray-100 text-gray-700",
  },
  solid: {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-500 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    neutral: "bg-gray-800 text-white",
  },
  outline: {
    primary: "ring-1 ring-inset ring-primary text-primary",
    secondary: "ring-1 ring-inset ring-secondary text-secondary",
    success: "ring-1 ring-inset ring-green-600 text-green-700",
    warning: "ring-1 ring-inset ring-yellow-500 text-yellow-700",
    error: "ring-1 ring-inset ring-red-600 text-red-700",
    info: "ring-1 ring-inset ring-blue-600 text-blue-700",
    neutral: "ring-1 ring-inset ring-gray-300 text-gray-700",
  },
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "soft",
  accent = "neutral",
  size = "medium",
  icon,
  className,
  children,
  ...rest
}) => {
  return (
    <span
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant][accent],
        className
      )}
      {...rest}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;


