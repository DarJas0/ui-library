import React from "react";
import clsx from "clsx";

type BadgeColor = "gray" | "purple" | "red" | "green" | "yellow";
type BadgeVariant = "soft" | "solid" | "outline";
type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const base = "inline-flex items-center font-medium rounded-full";

const sizeCls: Record<BadgeSize, string> = {
  sm: "text-[11px] leading-4 px-2 py-0.5",
  md: "text-xs leading-5 px-2.5 py-1",
};

const palette = {
  gray: {
    soft: "bg-gray-100 text-gray-800",
    solid: "bg-gray-800 text-white",
    outline: "ring-1 ring-inset ring-gray-300 text-gray-800",
  },
  purple: {
    soft: "bg-[#4C28D3]/10 text-[#4C28D3]",
    solid: "bg-[#4C28D3] text-white",
    outline: "ring-1 ring-inset ring-[#4C28D3] text-[#4C28D3]",
  },
  red: {
    soft: "bg-[#FF5050]/10 text-[#FF5050]",
    solid: "bg-[#FF5050] text-white",
    outline: "ring-1 ring-inset ring-[#FF5050] text-[#FF5050]",
  },
  green: {
    soft: "bg-green-100 text-green-800",
    solid: "bg-green-600 text-white",
    outline: "ring-1 ring-inset ring-green-300 text-green-700",
  },
  yellow: {
    soft: "bg-yellow-100 text-yellow-800",
    solid: "bg-yellow-500 text-white",
    outline: "ring-1 ring-inset ring-yellow-300 text-yellow-700",
  },
} as const;

export const Badge: React.FC<BadgeProps> = ({ color = "gray", variant = "soft", size = "md", className, children, ...rest }) => {
  return (
    <span className={clsx(base, sizeCls[size], palette[color][variant], className)} {...rest}>
      {children}
    </span>
  );
};

export default Badge;


