import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icons
import {
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white transition duration-300 ease-in-out dark:bg-gray-800 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 flex-shrink-0 items-center border-b border-gray-200 px-4 dark:border-gray-700">
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
        
        {/* Sidebar content */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-700 dark:bg-opacity-20 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
                onClick={() => {
                  if (onClose && window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 flex-shrink-0 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-300'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Sidebar footer */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-primary-500 dark:bg-gray-800 dark:text-primary-400">
                  <UserIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;