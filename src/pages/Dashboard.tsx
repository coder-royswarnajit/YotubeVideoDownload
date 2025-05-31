import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Components
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Stats data
const stats = [
  { name: 'Total Revenue', value: '$12,345', change: '+12.5%', trend: 'up' },
  { name: 'Active Users', value: '1,234', change: '+7.2%', trend: 'up' },
  { name: 'Conversion Rate', value: '3.45%', change: '-0.8%', trend: 'down' },
  { name: 'Avg. Session', value: '2m 45s', change: '+14.3%', trend: 'up' },
];

// Line chart data
const lineChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
  { name: 'Aug', value: 1300 },
  { name: 'Sep', value: 1000 },
  { name: 'Oct', value: 1200 },
  { name: 'Nov', value: 1500 },
  { name: 'Dec', value: 1700 },
];

// Bar chart data
const barChartData = [
  { name: 'Product A', value: 2400 },
  { name: 'Product B', value: 1398 },
  { name: 'Product C', value: 9800 },
  { name: 'Product D', value: 3908 },
  { name: 'Product E', value: 4800 },
];

// Pie chart data
const pieChartData = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 300 },
  { name: 'Category D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardPage = () => {
  const [activeChart, setActiveChart] = useState('line');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your application's performance and metrics
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div key={stat.name} variants={item}>
            <Card className="h-full">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      stat.trend === 'up'
                        ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                        : 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart Section */}
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Analytics Overview</h2>
          <div className="flex space-x-2">
            <Button
              variant={activeChart === 'line' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveChart('line')}
            >
              Line
            </Button>
            <Button
              variant={activeChart === 'bar' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveChart('bar')}
            >
              Bar
            </Button>
            <Button
              variant={activeChart === 'pie' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveChart('pie')}
            >
              Pie
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === 'line' && (
                <LineChart
                  data={lineChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f3f4f6', 
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem'
                    }} 
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Monthly Value"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    animationDuration={1500}
                  />
                </LineChart>
              )}

              {activeChart === 'bar' && (
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f3f4f6', 
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem'
                    }} 
                  />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="Product Sales"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              )}

              {activeChart === 'pie' && (
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    animationDuration={1500}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f3f4f6', 
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem'
                    }} 
                  />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      {/* Recent Activity Section */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      User {item} performed an action
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {item} hour{item !== 1 ? 's' : ''} ago
                    </p>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Additional Dashboard Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance Metrics */}
        <Card>
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">CPU Usage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">45%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-2 w-[45%] rounded-full bg-primary-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Memory Usage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">72%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-2 w-[72%] rounded-full bg-warning-500"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Storage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">89%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-2 w-[89%] rounded-full bg-error-500"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Report
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;