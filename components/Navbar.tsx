
import React, { useState } from 'react';
import { Menu, X, Moon, Sun, LogIn, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { NAV_LINKS } from '../constants.tsx';
import { Page, User } from '../types.ts';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isDark: boolean;
  toggleTheme: () => void;
  user: User | null;
  logout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, isDark, toggleTheme, user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <span className="text-white font-bold text-xl">TO</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">TechOrBit</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => setCurrentPage(link.path as Page)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  currentPage === link.path 
                    ? 'text-blue-600' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
            {user?.role === 'ADMIN' && (
              <button
                onClick={() => setCurrentPage('admin')}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  currentPage === 'admin' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
                }`}
              >
                <LayoutDashboard size={20} />
                Admin
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <LogIn size={18} />
                Login
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                setCurrentPage(link.path as Page);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              {link.icon}
              {link.name}
            </button>
          ))}
          {user?.role === 'ADMIN' && (
             <button
              onClick={() => {
                setCurrentPage('admin');
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <LayoutDashboard size={20} />
              Admin Dashboard
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
