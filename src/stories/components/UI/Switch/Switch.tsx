import React from "react";
import clsx from "clsx";

type SwitchColor = "purple" | "red";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: SwitchColor;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked,
  onChange,
  color = "purple",
  label,
  className,
  disabled,
  id,
  ...rest
}) => {
  const isControlled = typeof checked === "boolean";
  const [uncontrolled, setUncontrolled] = React.useState(!!defaultChecked);
  const current = isControlled ? !!checked : uncontrolled;

  const activeTrack = color === "purple" ? "bg-[#4C28D3]" : "bg-[#FF5050]";

  const toggle = () => {
    if (disabled) return;
    const next = !current;
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  };

  const buttonId = id || React.useId();
  const labelId = label ? `${buttonId}-label` : undefined;

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
          "relative inline-flex h-6 w-11 items-center rounded-full transition outline-none focus:ring-2 focus:ring-offset-2",
          current ? activeTrack : "bg-gray-300",
          color === "purple" && current && "focus:ring-[#4C28D3]/40",
          color === "red" && current && "focus:ring-[#FF5050]/40",
          !current && "focus:ring-gray-300/50",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        {...rest}
      >
        <span
          className={clsx(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-1 ring-black/5 transition",
            current ? "translate-x-5" : "translate-x-1"
          )}
        />
      </button>
      {label && (
        <span id={labelId} className={clsx("text-sm select-none", disabled ? "text-gray-400" : "text-gray-800")}
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


