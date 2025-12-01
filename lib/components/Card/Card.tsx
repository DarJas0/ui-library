import React from "react";
import clsx from "clsx";

type CardVariant = "elevated" | "outline" | "soft";
type CardAccent = "none" | "purple" | "red";
type CardPadding = "normal" | "compact";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  accent?: CardAccent;
  hoverable?: boolean;
  media?: React.ReactNode;
  padding?: CardPadding;
}

const variantClass: Record<CardVariant, string> = {
  elevated: "bg-white border shadow-lg",
  outline: "bg-white border shadow-sm",
  soft: "bg-gray-50 border border-gray-200 shadow-sm",
};

const accentClass: Record<Exclude<CardAccent, "none">, string> = {
  purple: "bg-[#4C28D3]",
  red: "bg-gradient-to-b from-[#FF5050] to-[#FF6A6A]",
};

const paddingClass: Record<CardPadding, string> = {
  normal: "px-5 py-4",
  compact: "px-4 py-3",
};

export const Card: React.FC<CardProps> = ({
  variant = "elevated",
  accent = "none",
  hoverable = false,
  media,
  padding = "normal",
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl",
        variantClass[variant],
        hoverable && "transition hover:shadow-xl",
        className
      )}
      {...rest}
    >
      {accent !== "none" && (
        <div className={clsx("absolute left-0 top-0 h-full w-1.5", accentClass[accent])} />
      )}

      {media && (
        <div className={clsx("w-full overflow-hidden", children && "border-b border-gray-200")}>
          {media}
        </div>
      )}

      {/* children will typically be CardHeader, CardBody, CardFooter as direct children to respect dividers */}
      {children}
    </div>
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  padding?: CardPadding;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, actions, className, children, padding = "normal", ...rest }) => (
  <div className={clsx("flex items-start justify-between gap-3", paddingClass[padding], className)} {...rest}>
    <div>
      {title && <div className="text-base font-semibold text-gray-900">{title}</div>}
      {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
      {!title && !subtitle && children}
    </div>
    {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
  </div>
);

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> { padding?: CardPadding; }

export const CardBody: React.FC<CardSectionProps> = ({ className, children, padding = "normal", ...rest }) => (
  <div className={clsx(paddingClass[padding], className)} {...rest}>{children}</div>
);

export const CardFooter: React.FC<CardSectionProps> = ({ className, children, padding = "normal", ...rest }) => (
  <div className={clsx("flex items-center justify-between", paddingClass[padding], className)} {...rest}>{children}</div>
);

export default Card;

