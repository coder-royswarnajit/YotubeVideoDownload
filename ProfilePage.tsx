import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Components
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/assets/avatar.jpg',
  role: 'Administrator',
  location: 'New York, NY',
  bio: 'Frontend developer with a passion for creating beautiful, responsive web applications.',
  joinedDate: 'January 2023',
  stats: [
    { name: 'Projects', value: 12 },
    { name: 'Followers', value: 342 },
    { name: 'Following', value: 125 },
  ],
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    location: user.location,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log('Updated profile data:', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <div className="flex flex-col items-center py-4">
              {/* Avatar */}
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-lg dark:border-gray-700">
                  <img
                    src={user.avatar || '/assets/default-avatar.png'}
                    alt={user.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/default-avatar.png';
                    }}
                  />
                </div>
                <button className="absolute bottom-0 right-0 rounded-full bg-primary-600 p-1.5 text-white shadow-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              
              {/* User info */}
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              <div className="mt-1 flex items-center space-x-1">
                <span className="inline-flex rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                  {user.role}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Joined {user.joinedDate}
                </span>
              </div>
              
              {/* Stats */}
              <div className="mt-6 grid w-full grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                {user.stats.map((stat) => (
                  <div key={stat.name} className="flex flex-col items-center p-2">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{stat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Navigation */}
          <Card className="mt-6">
            <nav className="-m-6">
              <div className="space-y-1 p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === 'profile'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === 'security'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === 'notifications'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === 'preferences'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  Preferences
                </button>
              </div>
            </nav>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'profile' && (
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          bio: user.bio,
                          location: user.location,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h3>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</h3>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</h3>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.bio}</p>
                  </div>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Security Settings
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Change Password</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your password to ensure account security
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Active Sessions</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage your active sessions across devices
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      View Sessions
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notification Settings
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications about account activities via email
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-700"
                      role="switch"
                      aria-checked="true"
                    >
                      <span className="sr-only">Enable email notifications</span>
                      <span className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark:bg-gray-200">
                        <span
                          className="opacity-100 duration-200 ease-in absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                          aria-hidden="true"
                        >
                          <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications on your device
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-700"
                        role="switch"
                        aria-checked="false"
                      >
                        <span className="sr-only">Enable push notifications</span>
                        <span className="translate-x-0 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark:bg-gray-200">
                          <span
                            className="opacity-100 duration-200 ease-in absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                            aria-hidden="true"
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'preferences' && (
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  User Preferences
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Language</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Select your preferred language
                    </p>
                  </div>
                  <div>
                    <select
                      id="language"
                      name="language"
                      className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                      defaultValue="english"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                    </select>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Time Zone</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Set your local time zone
                      </p>
                    </div>
                    <div>
                      <select
                        id="timezone"
                        name="timezone"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                        defaultValue="est"
                      >
                        <option value="pst">Pacific Time (PT)</option>
                        <option value="mst">Mountain Time (MT)</option>
                        <option value="cst">Central Time (CT)</option>
                        <option value="est">Eastern Time (ET)</option>
                        <option value="utc">UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;