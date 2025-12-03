import React from "react";
import clsx from "clsx";
import { Button } from "../Button/Button";

export interface NavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  logo: React.ReactNode | string;
  links?: NavbarLink[];
  className?: string;
  actions?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  links = [],
  className,
  actions,
}) => {
  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-200",
        "dark:bg-gray-900/90 dark:border-gray-800",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            {typeof logo === "string" ? (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                {logo}
              </span>
            ) : (
              logo
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={clsx(
                    "text-sm font-medium transition-colors duration-200",
                    link.active
                      ? "text-primary dark:text-primary-light"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  )}
                  aria-current={link.active ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Actions (Buttons etc) */}
          <div className="hidden md:block">
            {actions && <div className="flex items-center gap-4">{actions}</div>}
          </div>

          {/* Mobile menu button (placeholder for now) */}
          <div className="-mr-2 flex md:hidden">
            <Button variant="ghost" accent="neutral" size="small" icon={
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            } />
          </div>
        </div>
      </div>
    </nav>
  );
};
