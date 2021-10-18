import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Player, Position as PositionType } from '../../../../../common/types';
import Button from '../../../../../common/components/Button/Button';
import Circle from './Circle/Circle';
import Path from './Path/Path';
import { players } from '../../../../../common/constants';

type Props = {
  index: number,
  position: PositionType;
  player: Player;
  onSelectPosition: () => void;
}

export default function GameBoardPosition(props: Props) {
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
                if (player === players.o) {
                  return (
                    <Circle
                      key={`${players.o}-${index}`}
                      position={position}
                    />
                  );
                }
                if (player === players.x) {
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
}
