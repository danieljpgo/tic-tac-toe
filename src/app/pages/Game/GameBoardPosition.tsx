import { AnimatePresence, motion } from 'framer-motion';
import { Button, OMark, XMark } from '../../common/components';
import { players } from '../../common/constants';
import type { Player, Position } from '../../common/types';

type GameBoardPositionProps = {
  index: number,
  position: Position;
  player: Player;
  onSelectPosition: () => void;
}

export default function GameBoardPosition(props: GameBoardPositionProps) {
  const {
    index,
    position,
    player,
    onSelectPosition,
  } = props;

  return (
    <Button
      type="button"
      disabled={Boolean(position)}
      onClick={onSelectPosition}
    >
      <AnimatePresence exitBeforeEnter>
        <motion.svg
          className="p-3"
          aria-labelledby={`${position}-${index}`}
          viewBox="0 0 100 100"
          height="100%"
          width="100%"
          whileTap="pressed"
          initial={false}
          animate={position ? 'checked' : 'unchecked'}
        >
          <title id={`${position}-${index}`}>
            {position === players.o && 'selected by player circle'}
            {position === players.x && 'selected by player x'}
            {position === null && 'unmarked'}
          </title>
          <AnimatePresence exitBeforeEnter>
            {(() => {
              if (position === players.o) {
                return (
                  <OMark
                    key={`${players.o}-${index}`}
                    checked={Boolean(position)}
                  />
                );
              }
              if (position === players.x) {
                return (
                  <XMark
                    key={`${players.x}-${index}`}
                    checked={Boolean(position)}
                  />
                );
              }
              if (position === null) {
                if (player === players.o) {
                  return (
                    <OMark
                      key={`${players.o}-${index}`}
                      checked={Boolean(position)}
                    />
                  );
                }
                if (player === players.x) {
                  return (
                    <XMark
                      key={`${players.x}-${index}`}
                      checked={Boolean(position)}
                    />
                  );
                }
                return null;
              }
              return null;
            })()}
          </AnimatePresence>
        </motion.svg>
      </AnimatePresence>
    </Button>
  );
}
