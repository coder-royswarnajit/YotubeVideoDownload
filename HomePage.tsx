import { useState } from 'react';
import { motion } from 'framer-motion';

// Components
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import FeatureCard from '../components/common/FeatureCard';

// Icons
import { 
  RocketLaunchIcon, 
  PuzzlePieceIcon, 
  LightBulbIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Lightning Fast',
    description: 'Optimized for speed with modern build tools and efficient code splitting.',
    icon: RocketLaunchIcon,
    color: 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300',
  },
  {
    name: 'Component-Driven',
    description: 'Built with reusable components that are easy to customize and extend.',
    icon: PuzzlePieceIcon,
    color: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-300',
  },
  {
    name: 'Modern Stack',
    description: 'Powered by React, TypeScript, and Tailwind CSS for a developer-friendly experience.',
    icon: LightBulbIcon,
    color: 'bg-success-100 text-success-600 dark:bg-success-900 dark:text-success-300',
  },
];

const HomePage = () => {
  const [expanded, setExpanded] = useState(false);

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
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block">Welcome to</span>
            <span className="block text-primary-600 dark:text-primary-500">
              My Awesome App
            </span>
          </motion.h1>
          <motion.p 
            className="mx-auto mt-3 max-w-md text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            A powerful starter template built with React, TypeScript, and Tailwind CSS.
            Get started quickly with a modern, responsive, and feature-rich application.
          </motion.p>
          <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => setExpanded(!expanded)}
              >
                Get Started
              </Button>
            </motion.div>
            <motion.div 
              className="mt-3 sm:ml-3 sm:mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="lg"
                href="https://github.com/yourusername/my-awesome-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Feature-rich by default
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Everything you need to build your next awesome project
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {features.map((feature) => (
            <motion.div key={feature.name} variants={item}>
              <FeatureCard
                title={feature.name}
                description={feature.description}
                icon={feature.icon}
                iconClassName={feature.color}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Expanded Content (conditionally rendered) */}
      {expanded && (
        <motion.section 
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Getting Started Guide
              </h3>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <p className="mb-4">
                  Follow these steps to get up and running with My Awesome App:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Clone the repository from GitHub</li>
                  <li>Install dependencies with <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">npm install</code></li>
                  <li>Start the development server with <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">npm run dev</code></li>
                  <li>Open your browser to <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">http://localhost:5173</code></li>
                </ol>
              </div>
              <div className="mt-4">
                <a 
                  href="/documentation" 
                  className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  View full documentation
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
        </motion.section>
      )}
    </div>
  );
};

export default HomePage;