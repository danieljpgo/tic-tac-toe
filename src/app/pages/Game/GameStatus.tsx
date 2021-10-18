import { AnimatePresence, motion } from 'framer-motion';
import { Text } from '../../common/components';
import { players, radius, circumference } from '../../common/constants';

type Props = {
  children: string
}

export default function GameStatus(props: Props) {
  const { children } = props;
  const [title, label] = children
    .split(':')
    .map((value) => value.trim());

  const validLabel = label === players.x || label === players.o;

  return (
    <div className="fixed z-20 w-full px-8 top-8 sm:px-0 sm:top-auto sm:relative">
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md h-14 sm:w-auto">
        <Text variant="title">
          {validLabel
            ? `${title}:`
            : children}
        </Text>
        {validLabel && (
        <div className="w-8">
          <motion.svg
            height="100%"
            width="100%"
            viewBox="0 0 100 100"
            aria-labelledby={`${label}`}
          >
            <title id={`${label}`}>
              {label === players.o && 'player circle status'}
              {label === players.x && 'player x status'}
            </title>
            <AnimatePresence exitBeforeEnter>
              {label === players.o ? (
                <motion.circle
                  key={`${label}`}
                  className="text-pink-400 stroke-current"
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 0 }}
                  exit={{ strokeDashoffset: 283 }}
                />
              ) : (
                <motion.path
                  key={`${label}`}
                  className="text-blue-400 stroke-current"
                  d="M 12 12 88 88 M 88 12 12 88"
                  fill="transparent"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDashoffset: 1 }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.5 }}
                  exit={{ pathLength: 0 }}
                />
              )}
              ;
            </AnimatePresence>
          </motion.svg>
        </div>
        )}
      </div>
    </div>
  );
}
