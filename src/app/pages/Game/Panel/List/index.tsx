import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import type { History } from '../../../../common/types/game';
import { players } from '../../../../common/utils/constants';
import { calculateNextPlayer } from '../../utils';
import Step from './Step';

interface Props {
  history: History;
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const List = (props: Props) => {
  const { history, currentStep, onSelectStep } = props;
  const currentPlayer = calculateNextPlayer(history[currentStep]) === players.o
    ? players.x
    : players.o;

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.ol
          className="grid w-screen gap-2 px-20 pt-32 pb-2 sm:w-full sm:px-0 sm:pt-0 justify-self-center sm:pr-2 sm:max-w-none sm:pb-0 sm:overflow-y-auto sm:border-t sm:border-b sm:border-gray-300 sm:max-h-48 auto-rows-min"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
            out: {
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
              },
            },
          }}
          initial="hidden"
          animate="show"
          exit="out"
        >
          {history.map((_, step) => (
            <Step
              key={step.toString()}
              player={currentPlayer}
              current={step === currentStep}
              onSelectStep={() => onSelectStep(step)}
            >
              {step === 0 ? 'Go to game start' : `Go to move #${step} `}
              {step === currentStep && '*'}
            </Step>
          ))}
        </motion.ol>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default List;