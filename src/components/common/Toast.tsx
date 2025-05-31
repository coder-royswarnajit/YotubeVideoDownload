import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const typeConfig = {
  success: {
    icon: CheckCircleIcon,
    bgColor: 'bg-success-100 dark:bg-success-900 dark:bg-opacity-30',
    textColor: 'text-success-800 dark:text-success-300',
    borderColor: 'border-success-500 dark:border-success-700',
    iconColor: 'text-success-500 dark:text-success-400',
  },
  error: {
    icon: XCircleIcon,
    bgColor: 'bg-error-100 dark:bg-error-900 dark:bg-opacity-30',
    textColor: 'text-error-800 dark:text-error-300',
    borderColor: 'border-error-500 dark:border-error-700',
    iconColor: 'text-error-500 dark:text-error-400',
  },
  info: {
    icon: InformationCircleIcon,
    bgColor: 'bg-primary-100 dark:bg-primary-900 dark:bg-opacity-30',
    textColor: 'text-primary-800 dark:text-primary-300',
    borderColor: 'border-primary-500 dark:border-primary-700',
    iconColor: 'text-primary-500 dark:text-primary-400',
  },
  warning: {
    icon: ExclamationCircleIcon,
    bgColor: 'bg-warning-100 dark:bg-warning-900 dark:bg-opacity-30',
    textColor: 'text-warning-800 dark:text-warning-300',
    borderColor: 'border-warning-500 dark:border-warning-700',
    iconColor: 'text-warning-500 dark:text-warning-400',
  },
};

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  title,
  duration = 5000,
  onClose,
  position = 'top-right',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { icon: Icon, bgColor, textColor, borderColor, iconColor } = typeConfig[type];

  // Auto-dismiss toast after duration
  useEffect(() => {
    if (duration === 0) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // Handle close animation completion
  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose(id);
    }
  };

  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50 max-w-sm`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={handleAnimationComplete}
          layout
        >
          <div
            className={`flex w-full items-start overflow-hidden rounded-lg border-l-4 shadow-md ${bgColor} ${borderColor}`}
          >
            <div className="flex w-full flex-col p-3">
              <div className="flex items-start">
                <div className={`mr-2 flex-shrink-0 ${iconColor}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="ml-2 w-0 flex-1">
                  {title && (
                    <p className={`text-sm font-medium ${textColor}`}>{title}</p>
                  )}
                  <p className={`mt-1 text-sm ${textColor}`}>{message}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className={`inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${textColor}`}
                    onClick={() => setIsVisible(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;