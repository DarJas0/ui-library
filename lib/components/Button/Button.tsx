import React from "react";

export interface ButtonProps {
  color?: "red" | "purple";           // rot = valantic-rot, purple = valantic-lila
  variant?: "solid" | "outline";      // gefüllt oder nur Umrandung
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  color = "red",
  variant = "solid",
  size = "medium",
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const base =
    "inline-block font-bold font-sans leading-none rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizes = {
    small: "px-4 py-2 text-xs",
    medium: "px-5 py-[11px] text-sm",
    large: "px-6 py-3 text-base",
  };

  // gefüllt
  const solid = {
    red:    "text-white bg-gradient-to-r from-[#FF5050] to-[#FF6A6A] hover:opacity-90 focus:ring-[#FF5050]/60",
    purple: "text-white bg-[#4C28D3] hover:bg-[#3C21AA] focus:ring-[#4C28D3]/60",
  } as const;

  // outline
  const outline = {
    red:    "text-[#FF5050] bg-transparent border border-[#FF5050] hover:bg-[#FF5050]/10 focus:ring-[#FF5050]/50",
    purple: "text-[#4C28D3] bg-transparent border border-[#4C28D3] hover:bg-[#4C28D3]/10 focus:ring-[#4C28D3]/50",
  } as const;

  const style = variant === "solid" ? solid[color] : outline[color];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${style} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;

