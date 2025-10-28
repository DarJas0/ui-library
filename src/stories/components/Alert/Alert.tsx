import React from "react";
import clsx from "clsx";

export type AlertVariant = "info" | "success" | "warning" | "error";


export interface AlertProps {
    title?: string;

    children: React.ReactNode;

    variant?: AlertVariant;

    /** Show a dismiss button. If true, clicking X calls onClose */
    dismissible?: boolean;
    /** Called when the dismiss button is clicked */
    onClose?: () => void;
    /** Additional class names for the root */
    className?: string;
}

const base =
    "relative overflow-hidden rounded-xl border bg-white shadow-lg text-sm";

// Tailwind brand alignment (matches Button):
// - red gradient #FF5050 → #FF6A6A
// - purple solid #4C28D3
// Non-brand tones for success/warning remain green/orange
const tone: Record<AlertVariant, {
    accent: string; // left bar
    iconWrap: string; // circle background + ring
    icon: string; // icon color
    text: string; // text color
    border: string; // border color
}> = {
    info: {
        accent: "bg-[#4C28D3]",
        iconWrap: "bg-[#4C28D3]/10 ring-[#4C28D3]/20",
        icon: "text-[#4C28D3]",
        text: "text-gray-800",
        border: "border-gray-200",
    },
    success: {
        accent: "bg-green-500",
        iconWrap: "bg-green-50 ring-green-200",
        icon: "text-green-600",
        text: "text-gray-800",
        border: "border-green-200",
    },
    warning: {
        accent: "bg-[#FF7A00]",
        iconWrap: "bg-[#FF7A00]/10 ring-[#FF7A00]/20",
        icon: "text-[#FF7A00]",
        text: "text-gray-800",
        border: "border-amber-200",
    },
    error: {
        accent: "bg-gradient-to-b from-[#FF5050] to-[#FF6A6A]",
        iconWrap: "bg-[#FF5050]/10 ring-[#FF5050]/20",
        icon: "text-[#FF5050]",
        text: "text-gray-800",
        border: "border-red-200",
    },
};

const iconFor: Record<AlertVariant, React.ReactNode> = {
    info: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16Zm.75-11.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0Zm-2 3.25c0-.414.336-.75.75-.75h1a.75.75 0 01.75.75V14a.75.75 0 01-.75.75h-1A.75.75 0 018.75 14v-4.25Z" clipRule="evenodd" />
        </svg>
    ),
    success: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16Zm3.78-9.53a.75.75 0 00-1.06-1.06L9 11.13 7.28 9.4a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25Z" clipRule="evenodd" />
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.585A1.75 1.75 0 0116.76 18H3.24a1.75 1.75 0 01-1.5-3.316L8.257 3.1zM10 7.75a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0V8.5A.75.75 0 0010 7.75zm0 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
    ),
    error: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16ZM7.47 7.47a.75.75 0 011.06 0L10 8.94l1.47-1.47a.75.75 0 111.06 1.06L11.06 10l1.47 1.47a.75.75 0 11-1.06 1.06L10 11.06l-1.47 1.47a.75.75 0 11-1.06-1.06L8.94 10 7.47 8.53a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
    ),
};

export const Alert: React.FC<AlertProps> = ({
    title,
    children,
    variant = "info",
    dismissible = false,
    onClose,
    className,
}) => {
    const role = variant === "error" || variant === "warning" ? "alert" : undefined;
    return (
        <div className={clsx(base, tone[variant].border, className)} role={role}>
            {/* Left accent */}
            <div className={clsx("absolute left-0 top-0 h-full w-1.5", tone[variant].accent)} />

            <div className="p-4 pl-5 sm:p-5">
                <div className="flex items-start gap-3">
                    <span className={clsx("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-inset", tone[variant].iconWrap)}>
                        <span className={clsx(tone[variant].icon)}>{iconFor[variant]}</span>
                    </span>
                    <div className={clsx("flex-1", tone[variant].text)}>
                        {title && <div className="mb-0.5 text-sm font-semibold leading-5 text-gray-900">{title}</div>}
                        <div className="text-sm leading-5 text-gray-700">{children}</div>
                    </div>

                    {dismissible && (
                        <button
                            type="button"
                            aria-label="Dismiss"
                            onClick={onClose}
                            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                        >
                            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16ZM7.47 7.47a.75.75 0 011.06 0L10 8.94l1.47-1.47a.75.75 0 111.06 1.06L11.06 10l1.47 1.47a.75.75 0 11-1.06 1.06L10 11.06l-1.47 1.47a.75.75 0 11-1.06-1.06L8.94 10 7.47 8.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};