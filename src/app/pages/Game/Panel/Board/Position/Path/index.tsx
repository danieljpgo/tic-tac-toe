import { motion } from 'framer-motion';
import { Position } from '../../../../../../common/types';

const pathVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.25 : 0.25 }),
  checked: { pathLength: 0.5 },
  unchecked: { pathLength: 0 },
};

interface Props {
  position: Position,
}

const Path = (props: Props) => {
  const { position } = props;

  return (
    <motion.path
      className="text-blue-400 stroke-current"
      d="M 12 12 88 88 M 88 12 12 88"
      fill="transparent"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      custom={Boolean(position)}
      variants={pathVariants}
      style={{ strokeDashoffset: 1 }}
    />
  );
};

export default Path;
