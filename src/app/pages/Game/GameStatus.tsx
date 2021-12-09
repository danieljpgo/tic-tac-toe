import { AnimatePresence, motion } from 'framer-motion';
import type { Player, Position } from '../../../lib/tictactoe';
import { calculateStatus, players } from '../../../lib/tictactoe';
import { radius, circumference } from '../../../lib/shape';
import { Text } from '../../common/components';

type GameStatusProps = {
  status: ReturnType<typeof calculateStatus>,
  player: Player,
  winner: Position
}

function generateMessage(status: ReturnType<typeof calculateStatus>) {
  if (status === 'winner') {
    return 'Winner: ' as const;
  }
  if (status === 'draw') {
    return "Scratch: Cat's game";
  }
  return 'Next Player: ';
}

export default function GameStatus(props: GameStatusProps) {
  const { status, player, winner } = props;

  const title = generateMessage(status);
  const currentPlayer = winner || player;

  return (
    <div className="fixed z-20 w-full px-8 top-8 sm:px-0 sm:top-auto sm:relative">
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md h-14 sm:w-auto">
        <Text variant="title">
          {title}
        </Text>
        {status !== 'draw' && (
          <div className="w-8">
            <motion.svg
              height="100%"
              width="100%"
              viewBox="0 0 100 100"
              aria-labelledby={`${currentPlayer}`}
            >
              <title id={`${currentPlayer}`}>
                {currentPlayer === players.o && 'player circle status'}
                {currentPlayer === players.x && 'player x status'}
              </title>
              <AnimatePresence exitBeforeEnter>
                {currentPlayer === players.o ? (
                  <motion.circle
                    key={`${currentPlayer}`}
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
                    key={`${currentPlayer}`}
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
