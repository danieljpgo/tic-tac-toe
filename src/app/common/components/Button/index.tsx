import * as React from 'react';
import { motion } from 'framer-motion';
import { Children } from '../../types';

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
    children,
    type = 'button',
    disabled,
    elevation = 'md',
    onClick,
  } = props;

  return (
    <motion.button
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
      className={`w-full active:shadow bg-white rounded-lg shadow-md sm:shadow-md disabled:shadow-md  active:outline-none outline-none  focus:outline-none ${elevations[elevation]}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
