import React from "react";
import clsx from "clsx";

export type AlertVariant = "info" | "success" | "warning" | "error" | "neutral";

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
    "relative overflow-hidden rounded-xl border shadow-sm text-sm transition-all duration-200";

const tone: Record<AlertVariant, {
    accent: string; // left bar
    iconWrap: string; // circle background + ring
    icon: string; // icon color
    text: string; // text color
    border: string; // border color
    bg: string; // background color
}> = {
    info: {
        accent: "bg-secondary",
        iconWrap: "bg-secondary/10 ring-secondary/20",
        icon: "text-secondary",
        text: "text-gray-800",
        border: "border-gray-200",
        bg: "bg-white",
    },
    success: {
        accent: "bg-green-500",
        iconWrap: "bg-green-50 ring-green-200",
        icon: "text-green-600",
        text: "text-gray-800",
        border: "border-green-200",
        bg: "bg-green-50/50",
    },
    warning: {
        accent: "bg-[#FF7A00]",
        iconWrap: "bg-[#FF7A00]/10 ring-[#FF7A00]/20",
        icon: "text-[#FF7A00]",
        text: "text-gray-800",
        border: "border-amber-200",
        bg: "bg-amber-50/50",
    },
    error: {
        accent: "bg-[#FF0000]",
        iconWrap: "bg-[#FF0000]/10 ring-[#FF0000]/20",
        icon: "text-[#FF0000]",
        text: "text-gray-800",
        border: "border-red-200",
        bg: "bg-red-50/50",
    },
    neutral: {
        accent: "bg-gray-500",
        iconWrap: "bg-gray-100 ring-gray-200",
        icon: "text-gray-600",
        text: "text-gray-600",
        border: "border-gray-200",
        bg: "bg-gray-50/50",
    },
};

const iconFor: Record<AlertVariant, React.ReactNode> = {
    info: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0Zm-7-4a1 1 0 11-2 0 1 1 0 012 0ZM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9Z" clipRule="evenodd" />
        </svg>
    ),
    success: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16Zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5Z" clipRule="evenodd" />
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5Zm0 9a1 1 0 100-2 1 1 0 000 2Z" clipRule="evenodd" />
        </svg>
    ),
    error: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16ZM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
        </svg>
    ),
    neutral: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0Zm-7-4a1 1 0 11-2 0 1 1 0 012 0ZM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9Z" clipRule="evenodd" />
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
    const styles = tone[variant];

    return (
        <div className={clsx(base, styles.border, styles.bg, className)} role={role}>
            {/* Left accent */}
            <div className={clsx("absolute left-0 top-0 h-full w-1", styles.accent)} />

            <div className="p-4 pl-5 sm:p-5">
                <div className="flex items-start gap-3">
                    <span className={clsx("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-inset", styles.iconWrap)}>
                        <span className={clsx(styles.icon)}>{iconFor[variant]}</span>
                    </span>
                    <div className={clsx("flex-1 pt-0.5", styles.text)}>
                        {title && <div className="mb-1 text-sm font-semibold leading-none text-gray-900">{title}</div>}
                        <div className="text-sm leading-relaxed opacity-90">{children}</div>
                    </div>

                    {dismissible && (
                        <button
                            type="button"
                            aria-label="Dismiss"
                            onClick={onClose}
                            className="ml-2 -mr-1.5 -mt-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors"
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