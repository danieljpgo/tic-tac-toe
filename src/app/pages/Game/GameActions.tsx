import { useMediaQuery } from '../../common/hooks';
import { Button, Text } from '../../common/components';
import type { Display } from '../../common/types';

type GameActionsProps = {
  display: Display;
  onRestartClick: () => void;
  onSwitchDisplayClick: () => void;
}

export default function GameActions(props: GameActionsProps) {
  const { display, onRestartClick, onSwitchDisplayClick } = props;
  const isMobile = useMediaQuery('sm');

  return (
    <div className="fixed flex justify-between w-full px-8 sm:px-0 bottom-8 sm:relative sm:bottom-auto">
      <div>
        {isMobile && (
          <Button
            type="button"
            elevation="lg"
            onClick={onSwitchDisplayClick}
          >
            <div className="px-8 py-2 uppercase">
              <Text>{display === 'game' ? 'steps' : 'board'}</Text>
            </div>
          </Button>
        )}
      </div>
      <div>
        <Button
          type="button"
          elevation="lg"
          onClick={onRestartClick}
        >
          <div className="px-8 py-2 uppercase">
            <Text>restart</Text>
          </div>
        </Button>
      </div>
    </div>
  );
}
