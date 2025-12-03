import React from "react";
import clsx from "clsx";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  copyright: string;
  columns?: FooterColumn[];
  className?: string;
  logo?: React.ReactNode;
  socials?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({
  copyright,
  columns = [],
  className,
  logo,
  socials,
}) => {
  return (
    <footer className={clsx("bg-white text-gray-900 py-12 border-t border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-800", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            {logo && <div className="mb-4">{logo}</div>}
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Building digital products that matter.
            </p>
            {socials && <div className="flex gap-4 pt-2">{socials}</div>}
          </div>

          {/* Links Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white tracking-wider uppercase mb-4">
                {column.title}
              </h3>
              <ul role="list" className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {copyright}. All rights reserved.
          </p>
          <div className="flex gap-6">
             <a href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">Privacy Policy</a>
             <a href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
