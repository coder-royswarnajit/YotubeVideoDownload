import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// Icons
import {
  SunIcon,
  MoonIcon,
  UserIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Navigation items
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Profile', href: '/profile' },
];

interface HeaderProps {
  toggleSidebar?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isMobile = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative bg-white shadow-sm dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            {isMobile && (
              <div className="flex items-center">
                <button
                  type="button"
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={toggleSidebar}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            )}
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/assets/logo.svg"
                  alt="Logo"
                />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  MyApp
                </span>
              </Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-primary-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-primary-700 dark:hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full bg-gray-100 p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            
            {/* Notifications */}
            <button className="ml-3 rounded-full bg-gray-100 p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* Profile dropdown */}
            <div className="relative ml-3">
              <Link
                to="/profile"
                className="flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-700"
              >
                <span className="sr-only">Open user menu</span>
                <UserIcon className="h-8 w-8 rounded-full p-1 text-gray-500 dark:text-gray-400" />
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu open state */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 py-3 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;