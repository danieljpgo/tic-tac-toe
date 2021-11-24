import { motion } from 'framer-motion';

type XMarkProps = {
  checked: boolean,
}

export default function XMark(props: XMarkProps) {
  const { checked } = props;

  return (
    <motion.path
      className="text-blue-400 stroke-current"
      d="M 12 12 88 88 M 88 12 12 88"
      fill="transparent"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      custom={checked}
      variants={{
        pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.25 : 0.25 }),
        checked: { pathLength: 0.5 },
        unchecked: { pathLength: 0 },
      }}
      style={{ strokeDashoffset: 1 }}
    />
  );
}
