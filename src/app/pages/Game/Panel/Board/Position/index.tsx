import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Player, Position as PositionType } from '../../../../../common/types/game';
import Button from '../../../../../common/components/Button';

const RADIUS = 45;
const CIRCUMFERENCE = Math.ceil(2 * Math.PI * RADIUS);

const circleVariants = {
  pressed: (isChecked: boolean) => ({ strokeDashoffset: isChecked ? 141.5 : 141.5 }),
  checked: { strokeDashoffset: 0 },
  unchecked: { strokeDashoffset: 283 },
};

const pathVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.25 : 0.25 }),
  checked: { pathLength: 0.5 },
  unchecked: { pathLength: 0 },
};

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
            {position === 'O' && 'circle mark'}
            {position === 'X' && 'x mark'}
            {position === null && 'unmarked'}
          </title>
          <AnimatePresence exitBeforeEnter>
            {(() => {
              if (position === 'O') {
                return (
                  <motion.circle
                    key={`O-${index}`}
                    className="text-pink-400 stroke-current"
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="transparent"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={CIRCUMFERENCE}
                    custom={Boolean(position)}
                    variants={circleVariants}
                  />
                );
              }
              if (position === 'X') {
                return (
                  <motion.path
                    key={`X-${index}`}
                    className="text-blue-400 stroke-current"
                    d="M 12 12 88 88 M 88 12 12 88"
                    fill="transparent"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    custom={Boolean(position)}
                    variants={pathVariants}
                    style={{ strokeDashoffset: 1 }}
                  />
                );
              }
              if (position === null) {
                if (nextPlayer === 'O') {
                  return (
                    <motion.circle
                      key={`O-${index}`}
                      className="text-pink-400 stroke-current"
                      cx="50"
                      cy="50"
                      r={RADIUS}
                      fill="transparent"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={CIRCUMFERENCE}
                      custom={Boolean(position)}
                      variants={circleVariants}
                    />
                  );
                }
                if (nextPlayer === 'X') {
                  return (
                    <motion.path
                      key={`X-${index}`}
                      className="text-blue-400 stroke-current"
                      d="M 12 12 88 88 M 88 12 12 88"
                      fill="transparent"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      custom={Boolean(position)}
                      variants={pathVariants}
                      style={{ strokeDashoffset: 1 }}
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
