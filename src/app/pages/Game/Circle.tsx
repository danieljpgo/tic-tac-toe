import { motion } from 'framer-motion';
import { radius, circumference } from '../../common/constants';
import type { Position } from '../../common/types';

type CircleProps = {
  position: Position,
}

export default function Circle(props: CircleProps) {
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
      variants={{
        pressed: (isChecked: boolean) => ({ strokeDashoffset: isChecked ? 141.5 : 141.5 }),
        checked: { strokeDashoffset: 0 },
        unchecked: { strokeDashoffset: 283 },
      }}
    />
  );
}
