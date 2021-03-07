import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../../../common/utils/hooks';
import type { Display } from '../../../common/types';

interface Props {
  display: Display;
  children: [React.ReactNode, React.ReactNode];
}

const Panel = (props: Props) => {
  const { display, children } = props;
  const isMobile = useMediaQuery('sm');

  const [left, right] = children;

  return (
    <motion.div className="relative grid h-screen gap-6 px-8 overflow-hidden sm:overflow-visible sm:h-auto sm:gap-4 sm:px-0 sm:grid-cols-2 sm:auto-cols-min sm:static">
      <AnimatePresence>
        {(() => {
          if (isMobile) {
            return (
              <>
                <motion.div
                  key="left"
                  className="absolute justify-self-center"
                  initial={{ x: display === 'game' ? 0 : '-100vw' }}
                  animate={{ x: display === 'game' ? 0 : '-100vw' }}
                  exit={{ x: '-100vw' }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                  }}
                >
                  {left}
                </motion.div>
                <motion.div
                  key="right"
                  className="absolute justify-self-center"
                  initial={{ x: '100vw' }}
                  animate={{ x: display === 'list' ? 0 : '100vw' }}
                  exit={{ x: '100vw' }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                  }}
                >
                  {right}
                </motion.div>
              </>
            );
          }
          return (
            <>
              {left}
              {right}
            </>
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
};

export default Panel;
