import { AnimatePresence, motion } from 'framer-motion';
import { players } from '../../../common/types/game';
import Text from '../../../common/components/Text';

const radius = 45;
const circumference = Math.ceil(2 * Math.PI * radius);

interface Props {
  children: string
}

const Status = (props: Props) => {
  const { children } = props;
  const { o, x } = players;
  const [title, label] = children
    .split(':')
    .map((value) => value.trim());

  const labelValid = label === x || label === o;

  return (
    <div className="fixed flex items-center justify-center w-full gap-2 px-4 py-2 bg-white rounded-b-full shadow-md h-14 sm:rounded-lg sm:relative sm:w-auto">
      <Text variant="title">
        {labelValid
          ? (`${title}:`)
          : (`${children}`)}
      </Text>
      {labelValid && (
        <div className="w-8">
          <motion.svg
            height="100%"
            width="100%"
            viewBox="0 0 100 100"
            aria-labelledby={`${label}`}
          >
            <title id={`${label}`}>
              {label === 'O' && 'circle mark'}
              {label === 'X' && 'x mark'}
            </title>
            <AnimatePresence exitBeforeEnter>
              {(() => {
                if (label === 'O') {
                  return (
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
                  );
                }
                if (label === 'X') {
                  return (
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
                  );
                }
                return null;
              })()}
            </AnimatePresence>
          </motion.svg>
        </div>
      )}
    </div>
  );
};

export default Status;
