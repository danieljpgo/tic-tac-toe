import Button from '../../../common/components/Button';
import Text from '../../../common/components/Text';
import { Display } from '../../../common/types';
import { useMediaQuery } from '../../../common/utils/hooks/useMedia';

interface Props {
  display: Display;
  onRestartClick: () => void;
  onSwitchDisplay: () => void;
}

const Actions = (props: Props) => {
  const { display, onRestartClick, onSwitchDisplay } = props;
  const isMobile = useMediaQuery('sm');

  return (
    <div className="fixed flex justify-between w-full px-8 sm:px-0 bottom-8 sm:relative sm:bottom-auto">
      <div>
        {isMobile && (
          <Button
            type="button"
            elevation="lg"
            onClick={onSwitchDisplay}
          >
            <div className="px-8 py-2 uppercase">
              <Text>
                {display === 'game' ? 'board' : 'steps'}
              </Text>
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
            <Text>
              restart
            </Text>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Actions;
