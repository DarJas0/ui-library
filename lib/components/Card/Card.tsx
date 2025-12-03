import React from "react";
import clsx from "clsx";

export type CardVariant = "elevated" | "outline" | "soft" | "ghost";


export type CardAccent = "primary" | "secondary" | "none";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  accent?: CardAccent;
  hoverable?: boolean;

}

const variantStyles: Record<CardVariant, string> = {
  elevated: "bg-white shadow-md border border-gray-100 dark:bg-gray-900 dark:border-gray-800",
  outline: "bg-white border border-gray-200 dark:bg-transparent dark:border-gray-700",
  soft: "bg-gray-50/50 border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700",
  ghost: "bg-transparent border-transparent",
};

const accentStyles: Record<CardAccent, string> = {
  primary: "border-l-4 border-l-[#FF514B]",
  secondary: "border-l-4 border-l-[#3643B3]",
  none: "",
};



export const Card: React.FC<CardProps> = ({
  variant = "elevated",
  accent = "none",
  hoverable = false,

  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out",
        variantStyles[variant],
        accentStyles[accent],
        hoverable && "hover:-translate-y-1 hover:shadow-xl cursor-pointer",
        className
      )}
      {...rest}
    >

      {children}
    </div>
  );
};

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  logoSrc?: string;
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  logoSrc,
  className,
  ...rest
}) => {
  return (
    <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
      <img
        src={src}
        alt={alt}
        className={clsx("w-full h-full object-cover transition-transform duration-700 hover:scale-105", className)}
        {...rest}
      />
      {logoSrc && (
        <div className="absolute top-6 left-6 w-auto h-12 md:h-14">
          <img 
            src={logoSrc} 
            alt="Logo Overlay" 
            className="w-full h-full object-contain drop-shadow-md" 
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
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
    <div className={clsx("flex items-start justify-between gap-4 px-6 pt-6 mb-2", className)} {...rest}>
      <div className="flex flex-col gap-1">
        {title && (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
            {subtitle}
          </p>
        )}
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
    <div className={clsx("px-6 py-2 text-base text-gray-600 dark:text-gray-300 flex-grow leading-relaxed", className)} {...rest}>
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
    <div className={clsx("px-6 pb-6 pt-4 mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800", className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;


