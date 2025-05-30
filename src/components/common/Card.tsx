import React, { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  noPadding?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  noPadding = false,
  hoverable = false,
  bordered = true,
  ...rest
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-sm dark:bg-gray-800';
  const paddingStyles = noPadding ? '' : 'p-6';
  const hoverStyles = hoverable ? 'transition-shadow duration-300 hover:shadow-md' : '';
  const borderStyles = bordered ? 'border border-gray-200 dark:border-gray-700' : '';
  
  const cardStyles = `${baseStyles} ${paddingStyles} ${hoverStyles} ${borderStyles} ${className}`.trim();
  
  return (
    <div className={cardStyles} {...rest}>
      {children}
    </div>
  );
};

export default Card;