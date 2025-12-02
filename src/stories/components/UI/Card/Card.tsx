import React from "react";
import clsx from "clsx";

export type CardVariant = "elevated" | "outline" | "soft" | "ghost";
export type CardAccent = "none" | "primary" | "secondary";
export type CardPadding = "none" | "compact" | "normal" | "relaxed";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style of the card.
   * @default "elevated"
   */
  variant?: CardVariant;
  /**
   * The accent color of the card, aligning with Valantic CI.
   * @default "none"
   */
  accent?: CardAccent;
  /**
   * Whether the card should interact on hover (lift + shadow).
   * @default false
   */
  hoverable?: boolean;
  /**
   * Optional cover image to display at the top of the card.
   */
  coverImage?: string;
  /**
   * Padding inside the card content.
   * @default "normal"
   */
  padding?: CardPadding;
}

const variantStyles: Record<CardVariant, string> = {
  elevated: "bg-white shadow-md border border-gray-100",
  outline: "bg-white border border-gray-200",
  soft: "bg-gray-50/50 border border-gray-100",
  ghost: "bg-transparent border-transparent",
};

const accentStyles: Record<Exclude<CardAccent, "none">, string> = {
  primary: "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-[#FF0000]", // Valantic Red
  secondary: "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-[#1E293B]", // Valantic Dark Blue
};

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  compact: "p-4",
  normal: "p-6",
  relaxed: "p-8",
};

export const Card: React.FC<CardProps> = ({
  variant = "elevated",
  accent = "none",
  hoverable = false,
  coverImage,
  padding = "normal",
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col overflow-hidden rounded-xl transition-all duration-300 ease-out",
        variantStyles[variant],
        accent !== "none" && accentStyles[accent],
        hoverable && "hover:-translate-y-1 hover:shadow-xl cursor-pointer",
        className
      )}
      {...rest}
    >
      {coverImage && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={coverImage}
            alt="Card cover"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className={clsx("flex flex-col flex-grow", paddingStyles[padding])}>
        {children}
      </div>
    </div>
  );
};

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className,
  children,
  ...rest
}) => {
  return (
    <div className={clsx("flex items-start justify-between gap-4 mb-4", className)} {...rest}>
      <div className="flex flex-col gap-1">
        {title && <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-500 font-medium">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={clsx("text-base text-gray-600 flex-grow", className)} {...rest}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={clsx("mt-6 flex items-center justify-between pt-4 border-t border-gray-100", className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;


