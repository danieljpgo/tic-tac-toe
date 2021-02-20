import { motion } from 'framer-motion';
import type { Children, Player } from '../../../../../common/types';
import Button from '../../../../../common/components/Button';
import Text from '../../../../../common/components/Text';

interface Props extends Children {
  step: boolean;
  player: Player;
  disabled: boolean;
  onSelectStep: () => void;
}

const Step = (props: Props) => {
  const {
    step,
    player,
    disabled,
    children,
    onSelectStep,
  } = props;

  return (
    <motion.li
      className="flex gap-2 sm:pl-1"
      variants={{
        hidden: {
          y: 20,
        },
        show: {
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
            duration: 0.8,
          },
        },
        out: {
          y: 20,
          transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
            duration: 0.8,
          },
        },
      }}
    >
      {step && (
        <motion.div
          className={`h-2 w-2 bg-gradient-to-b self-center ${player === 'O' ? 'bg-pink-400' : 'bg-blue-400'}`}
          animate
          layoutId="selected"
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            duration: 0.8,
          }}
          style={{ borderRadius: '100%' }}
        />
      )}
      <motion.div
        className="w-full"
        variants={{
          hidden: {
            opacity: 0,
          },
          show: {
            opacity: 1,
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.8,
            },
          },
          out: {
            opacity: 0,
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.8,
            },
          },
        }}
      >
        <Button
          type="button"
          disabled={disabled}
          onClick={onSelectStep}
        >
          <div className="flex px-4 py-2">
            <Text variant="sub">{children}</Text>
          </div>
        </Button>
      </motion.div>
    </motion.li>
  );
};

export default Step;
