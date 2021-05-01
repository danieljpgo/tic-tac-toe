import type { Display } from '../../../common/types';
import { useMediaQuery } from '../../../common/utils/hooks';
import Button from '../../../common/components/Button';
import Text from '../../../common/components/Text';

interface Props {
  display: Display;
  onRestartClick: () => void;
  onSwitchDisplayClick: () => void;
}

const Actions = (props: Props) => {
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
              <Text>{display === 'game' ? 'board' : 'steps'}</Text>
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
};

export default Actions;
