import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8 text-9xl font-extrabold text-primary-400 dark:text-primary-500">
          404
        </div>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            as={Link} 
            to="/" 
            variant="primary"
            size="lg"
          >
            Go Home
          </Button>
          <Button 
            as={Link}
            to="/dashboard"
            variant="outline"
            size="lg"
          >
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 opacity-20 dark:from-primary-900 dark:to-primary-800"></div>
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-200 opacity-20 dark:from-secondary-900 dark:to-secondary-800"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;