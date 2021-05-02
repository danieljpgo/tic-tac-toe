import { motion } from 'framer-motion';
import type { Position } from '../../../../../../common/types';

const radius = 45;
const circumference = Math.ceil(2 * Math.PI * radius);

const circleVariants = {
  pressed: (isChecked: boolean) => ({ strokeDashoffset: isChecked ? 141.5 : 141.5 }),
  checked: { strokeDashoffset: 0 },
  unchecked: { strokeDashoffset: 283 },
};

interface CircleProps {
  position: Position,
}

const Circle = (props: CircleProps) => {
  const { position } = props;

  return (
    <motion.circle
      className="text-pink-400 stroke-current"
      cx="50"
      cy="50"
      r={radius}
      fill="transparent"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={circumference}
      custom={Boolean(position)}
      variants={circleVariants}
    />
  );
};

export default Circle;
