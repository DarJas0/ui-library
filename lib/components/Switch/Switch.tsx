import React from "react";
import clsx from "clsx";

export type SwitchAccent = "primary" | "secondary" | "success" | "neutral";
export type SwitchSize = "small" | "medium";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  accent?: SwitchAccent;
  size?: SwitchSize;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked,
  onChange,
  accent = "secondary",
  size = "medium",
  label,
  className,
  disabled,
  id,
  ...rest
}) => {
  const isControlled = typeof checked === "boolean";
  const [uncontrolled, setUncontrolled] = React.useState(!!defaultChecked);
  const current = isControlled ? !!checked : uncontrolled;

  const toggle = () => {
    if (disabled) return;
    const next = !current;
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  };

  const buttonId = id || React.useId();
  const labelId = label ? `${buttonId}-label` : undefined;

  const accentStyles: Record<SwitchAccent, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-green-600",
    neutral: "bg-gray-600",
  };

  const sizeStyles = {
    small: {
      track: "h-5 w-9",
      thumb: "h-3.5 w-3.5",
      translate: "translate-x-4",
    },
    medium: {
      track: "h-6 w-11",
      thumb: "h-5 w-5",
      translate: "translate-x-5",
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div className={clsx("inline-flex items-center gap-3", className)}>
      <button
        type="button"
        id={buttonId}
        role="switch"
        aria-checked={current}
        aria-labelledby={labelId}
        aria-disabled={disabled || undefined}
        onClick={toggle}
        disabled={disabled}
        className={clsx(
          "relative inline-flex items-center rounded-full transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-2",
          currentSize.track,
          current ? accentStyles[accent] : "bg-gray-300",
          accent === "secondary" && current && "focus:ring-secondary/40",
          accent === "primary" && current && "focus:ring-primary/40",
          !current && "focus:ring-gray-300/50",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        {...rest}
      >
        <span
          className={clsx(
            "inline-block transform rounded-full bg-white shadow ring-1 ring-black/5 transition-transform duration-200",
            currentSize.thumb,
            current ? currentSize.translate : "translate-x-0.5"
          )}
        />
      </button>
      {label && (
        <span 
          id={labelId} 
          className={clsx("text-sm select-none font-medium", disabled ? "text-gray-400" : "text-gray-700")}
          onClick={toggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Switch;


