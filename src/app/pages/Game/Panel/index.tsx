import * as React from 'react';
import { useMediaQuery } from '../../../common/utils/hooks/useMedia';
import type { Display } from '../../../common/types/game';

interface Props {
  display: Display;
  left: React.ReactNode;
  right: React.ReactNode;
}

const Panel = (props: Props) => {
  const { display, left, right } = props;
  const isMobile = useMediaQuery('sm');

  return (
    <div className="grid h-screen gap-6 px-8 sm:h-auto sm:gap-4 sm:px-0 sm:grid-cols-2 sm:auto-cols-min">
      {(() => {
        if (isMobile) {
          if (display === 'game') {
            return left;
          }
          return right;
        }
        return (
          <>
            {left}
            {right}
          </>
        );
      })()}
    </div>
  );
};

export default Panel;
