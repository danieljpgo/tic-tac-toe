import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Player, Position as PositionType } from '../../../../../common/types';
import { players } from '../../../../../common/types';
import Button from '../../../../../common/components/Button';
import Circle from './Circle';
import Path from './Path';

interface Props {
  index: number,
  position: PositionType;
  nextPlayer: Player;
  onSelectPosition: () => void;
}

const Position = (props: Props) => {
  const {
    index,
    position,
    nextPlayer,
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
            {position === players.o && 'circle player mark'}
            {position === players.x && 'x player mark'}
            {position === null && 'unmarked'}
          </title>
          <AnimatePresence exitBeforeEnter>
            {(() => {
              if (position === players.o) {
                return (
                  <Circle
                    key={`${players.o}-${index}`}
                    position={position}
                  />
                );
              }
              if (position === players.x) {
                return (
                  <Path
                    key={`${players.x}-${index}`}
                    position={position}
                  />
                );
              }
              if (position === null) {
                if (nextPlayer === players.o) {
                  return (
                    <Circle
                      key={`${players.o}-${index}`}
                      position={position}
                    />
                  );
                }
                if (nextPlayer === players.x) {
                  return (
                    <Path
                      key={`${players.x}-${index}`}
                      position={position}
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
};

export default Position;
