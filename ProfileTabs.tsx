import React from 'react';

export type TabId = 'profile' | 'security' | 'notifications' | 'preferences';

interface TabItem {
  id: TabId;
  label: string;
  icon?: React.ReactNode;
}

interface ProfileTabsProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  tabs?: TabItem[];
  vertical?: boolean;
  className?: string;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  tabs = [
    { id: 'profile', label: 'Profile Information' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'preferences', label: 'Preferences' },
  ],
  vertical = false,
  className = '',
}) => {
  const baseTabClass = `
    group flex items-center rounded-md px-3 py-2 text-sm font-medium
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
  `;
  
  const activeTabClass = `
    bg-primary-100 text-primary-700
    dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-300
  `;
  
  const inactiveTabClass = `
    text-gray-700 hover:bg-gray-100 hover:text-gray-900
    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white
  `;

  return (
    <div
      className={`${vertical ? 'flex flex-col space-y-1' : 'flex space-x-4 border-b border-gray-200 dark:border-gray-700'} ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            ${baseTabClass}
            ${activeTab === tab.id ? activeTabClass : inactiveTabClass}
            ${vertical ? 'justify-start text-left' : 'justify-center text-center'}
            ${!vertical && activeTab === tab.id ? 'border-b-2 border-primary-500 dark:border-primary-400' : ''}
          `}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;