import React from "react";
import clsx from "clsx";
import { Button } from "../Button/Button";

export interface CtaProps extends React.HTMLAttributes<HTMLElement> {
  /** Big headline above the card */
  headline: string;
  /** Image source inside the card */
  imageSrc: string;
  /** Accessible alt text for the image */
  imageAlt?: string;
  /** Main body text; if omitted, children will be rendered instead */
  body?: React.ReactNode;
  /** Label of the primary CTA button */
  primaryLabel: string;
  /** Click handler for the primary CTA button */
  onPrimaryClick?: () => void;
  /** Label of the secondary CTA button */
  secondaryLabel?: string;
  /** Click handler for the secondary CTA button */
  onSecondaryClick?: () => void;
  /** Background style variant */
  variant?: "default" | "dark" | "gradient";
}

export const CtaSection: React.FC<CtaProps> = ({
  headline,
  imageSrc,
  imageAlt,
  body,
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
  variant = "dark",
  className,
  children,
  ...rest
}) => {
  const content = body ?? children;

  const bgStyles = {
    default: "bg-gray-50",
    dark: "bg-[#1E293B]", // Valantic Dark Blue
    gradient: "bg-gradient-to-br from-[#1E293B] to-[#0F172A]",
  };

  const textStyles = {
    default: "text-gray-900",
    dark: "text-white",
    gradient: "text-white",
  };

  const cardStyles = {
    default: "bg-white shadow-xl border border-gray-100",
    dark: "bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm",
    gradient: "bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md",
  };

  return (
    <section
      className={clsx(
        "w-full py-16 md:py-24 transition-colors duration-300",
        bgStyles[variant],
        className
      )}
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className={clsx(
          "text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 leading-tight tracking-tight",
          textStyles[variant]
        )}>
          {headline}
        </h2>

        <div className={clsx(
          "rounded-3xl overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-12",
          cardStyles[variant]
        )}>
          {/* Left: Image */}
          <div className="md:w-1/2 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10" />
            <img
              src={imageSrc}
              alt={imageAlt ?? ""}
              className="w-full h-64 md:h-full object-cover rounded-2xl shadow-lg transform transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className={clsx(
              "text-lg md:text-xl leading-relaxed space-y-4 font-medium",
              variant === "default" ? "text-gray-600" : "text-gray-300"
            )}>
              {typeof content === "string" ? <p>{content}</p> : content}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                label={primaryLabel}
                onClick={onPrimaryClick}
                variant="solid"
                accent="primary"
                size="large"
                className="shadow-lg hover:shadow-red-900/20"
              />
              {secondaryLabel && (
                <Button
                  label={secondaryLabel}
                  onClick={onSecondaryClick}
                  variant="outline"
                  accent={variant === "default" ? "secondary" : "neutral"}
                  size="large"
                  className={variant !== "default" ? "!text-white !border-white/30 hover:!bg-white/10 hover:!border-white" : ""}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
