import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import type { History } from '../../../lib/tictactoe';
import { players, calculateNextPlayer } from '../../../lib/tictactoe';
import Step from './GameStep';

type GameStepsProps = {
  history: History;
  step: number;
  onSelectStep: (step: number) => void;
}

export default function GameSteps(props: GameStepsProps) {
  const { history, step, onSelectStep } = props;

  const player = calculateNextPlayer(history[step]) === players.o
    ? players.x
    : players.o;

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.ol
          className="grid w-screen gap-2 px-20 pt-32 pb-2 sm:w-full sm:px-0 sm:pt-0 justify-self-center sm:pr-2 sm:max-w-none sm:pb-0 sm:overflow-y-auto sm:border-t sm:border-b sm:border-gray-300 sm:max-h-48 auto-rows-min"
          aria-label="step-list"
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
          {history.map((_, index) => (
            <Step
              key={index.toString()}
              player={player}
              current={index === step}
              onSelectStep={() => onSelectStep(index)}
            >
              {`${index === 0 ? 'Go to game start' : `Go to move #${index} `} ${index === step ? '*' : ''}`}
            </Step>
          ))}
        </motion.ol>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}
