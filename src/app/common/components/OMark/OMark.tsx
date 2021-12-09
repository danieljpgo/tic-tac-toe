import { motion } from 'framer-motion';
import { radius, circumference } from '../../../../lib/shape';

type OMarkProps = {
  checked: boolean,
}

export default function OMark(props: OMarkProps) {
  const { checked } = props;

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
      custom={checked}
      variants={{
        pressed: (isChecked: boolean) => ({ strokeDashoffset: isChecked ? 141.5 : 141.5 }),
        checked: { strokeDashoffset: 0 },
        unchecked: { strokeDashoffset: 283 },
      }}
    />
  );
}
