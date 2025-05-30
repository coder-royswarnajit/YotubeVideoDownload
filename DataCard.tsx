import React from 'react';
import { motion } from 'framer-motion';

// Components
import Card from '../../common/Card';

interface DataCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  onClick?: () => void;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  className = '',
  onClick,
}) => {
  // Trend colors and icons
  const trendConfig = {
    up: {
      color: 'text-success-600 dark:text-success-400',
      bgColor: 'bg-success-100 dark:bg-success-900 dark:bg-opacity-20',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    down: {
      color: 'text-error-600 dark:text-error-400',
      bgColor: 'bg-error-100 dark:bg-error-900 dark:bg-opacity-20',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1v-5a1 1 0 112 0v2.586l4.293-4.293a1 1 0 011.414 0L16 9.586 19.293 6.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0L11 9.414 7.414 13H12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    neutral: {
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Card
        className={`h-full transition-shadow duration-300 hover:shadow-md ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
        hoverable
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
            )}
            {trend && trendValue && (
              <div className="mt-2 flex items-center">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    trendConfig[trend].color
                  } ${trendConfig[trend].bgColor}`}
                >
                  <span className="mr-1">{trendConfig[trend].icon}</span>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="rounded-md bg-gray-100 p-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              {icon}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default DataCard;