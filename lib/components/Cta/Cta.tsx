import React from "react";

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
}

export const CtaSection: React.FC<CtaProps> = ({
  headline,
  imageSrc,
  imageAlt,
  body,
  primaryLabel,
  onPrimaryClick,
  className,
  children,
  ...rest
}) => {
  const content = body ?? children;

  return (
    <section
      className={`w-full bg-gray-50 py-12 md:py-16 ${className ?? ""}`}
      {...rest}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Headline above card */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          {headline}
        </h2>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg flex flex-col md:flex-row gap-8 md:gap-10 p-6 md:p-10">
          {/* Left: image */}
          <div className="md:w-1/2">
            <div className="relative w-full overflow-hidden rounded-2xl">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={imageAlt ?? ""}
                  className="w-full h-full rounded-2xl object-cover"
                />
              )}
            </div>
          </div>

          {/* Right: text + button */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div className="text-base md:text-lg leading-relaxed text-gray-700 space-y-3">
              {typeof content === "string" ? <p>{content}</p> : content}
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onPrimaryClick}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition"
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

