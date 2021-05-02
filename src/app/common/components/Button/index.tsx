import * as React from 'react';
import { motion } from 'framer-motion';
import type { Children } from '../../types';

const elevations = {
  md: 'shadow-md',
  lg: 'shadow-lg',
} as const;

interface Props extends Children {
  type: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  elevation?: keyof typeof elevations;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = (props: Props) => {
  const {
    type = 'button',
    disabled,
    children,
    elevation = 'md',
    onClick,
  } = props;

  return (
    <motion.button
      className={`w-full transition-shadow active:shadow bg-white rounded-lg shadow-md sm:shadow-md disabled:shadow-md active:outline-none outline-none focus:outline-none ${elevations[elevation]} focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50`}
      layout
      whileTap={{
        scale: disabled ? 1 : 0.95,
        x: disabled ? [0, -5, 5, -5, 5, -5, 5, -5, 5, -5, 0] : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
