import React from "react";
import clsx from "clsx";

type HeroAlign = "left" | "center";

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Background image URL that fills the hero */
  backgroundImage?: string;
  /** Align content block left or centered within the hero */
  align?: HeroAlign;
  /** Dark overlay on top of the image for readability */
  overlay?: boolean;
}

const alignClasses: Record<HeroAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

export const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  align = "left",
  overlay = true,
  className,
  children,
  ...rest
}) => {
  return (
    <section
      className={clsx(
        "relative flex h-[70vh] min-h-[520px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#111827] via-[#020617] to-[#111827]",
        className
      )}
      {...rest}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Hero background"
            className="h-full w-full object-cover"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          )}
        </div>
      )}

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-10 sm:px-10 md:px-16">
        <div
          className={clsx(
            "flex w-full max-w-6xl flex-col gap-8",
            alignClasses[align]
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export interface HeroContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroContent: React.FC<HeroContentProps> = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={clsx("space-y-6 max-w-3xl", className)}
    {...rest}
  >
    {children}
  </div>
);

export interface HeroEyebrowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroEyebrow: React.FC<HeroEyebrowProps> = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={clsx(
      "inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-gray-200/80 backdrop-blur",
      className
    )}
    {...rest}
  >
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#FF5050] to-[#FF6A6A]" />
    {children}
  </div>
);

export interface HeroTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  className,
  children,
  ...rest
}) => (
  <h1
    className={clsx(
      "text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.05]",
      className
    )}
    {...rest}
  >
    {children}
  </h1>
);

export interface HeroSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const HeroSubtitle: React.FC<HeroSubtitleProps> = ({
  className,
  children,
  ...rest
}) => (
  <p
    className={clsx(
      "text-pretty text-base text-gray-200/90 sm:text-lg md:text-xl",
      className
    )}
    {...rest}
  >
    {children}
  </p>
);

export interface HeroActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroActions: React.FC<HeroActionsProps> = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={clsx("flex flex-wrap items-center gap-4", className)}
    {...rest}
  >
    {children}
  </div>
);

export default Hero;

