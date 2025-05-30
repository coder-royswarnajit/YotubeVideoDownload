import React from 'react';
import { motion } from 'framer-motion';

// Import Card Component
import Card from './Card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  className?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  iconClassName = 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300',
  className = '',
  onClick,
}) => {
  return (
    <Card 
      className={`h-full transition-all duration-300 hover:translate-y-[-4px] ${onClick ? 'cursor-pointer' : ''} ${className}`}
      hoverable
      onClick={onClick}
    >
      <div className="flex flex-col items-start">
        <div className={`mb-4 rounded-md p-3 ${iconClassName}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </Card>
  );
};

// Animated version of the FeatureCard
export const AnimatedFeatureCard: React.FC<FeatureCardProps> = (props) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <FeatureCard {...props} />
    </motion.div>
  );
};

export default FeatureCard;