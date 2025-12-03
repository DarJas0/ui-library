import React from 'react';

import { Button } from "../../../../../lib/components/Button/Button";

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header className="w-full bg-white border-b border-gray-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z" fill="#FFF" />
              <path d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z" fill="#4C28D3" />
              <path d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z" fill="#FF5050" />
            </g>
          </svg>
          <h1 className="m-0 text-base font-bold text-gray-900">Acme</h1>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#" className="hover:text-gray-900">Features</a>
          <a href="#" className="hover:text-gray-900">Pricing</a>
          <a href="#" className="hover:text-gray-900">Docs</a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-600">Welcome, <b className="font-semibold text-gray-900">{user.name}</b></span>
              <Button size="small" variant="outline" accent="secondary" onClick={onLogout} label="Log out" />
            </>
          ) : (
            <>
              <Button size="small" variant="outline" accent="secondary" onClick={onLogin} label="Log in" />
              <Button size="small" variant="solid" accent="primary" onClick={onCreateAccount} label="Sign up" />
            </>
          )}
        </div>
      </div>
    </div>
  </header>
);
