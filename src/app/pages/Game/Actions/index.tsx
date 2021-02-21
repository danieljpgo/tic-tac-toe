import Button from '../../../common/components/Button';
import Text from '../../../common/components/Text';

interface Props {
  onRestartClick: () => void;
  onSwitch: () => void;
}

const Actions = (props: Props) => {
  const { onRestartClick, onSwitch } = props;

  return (
    <div className="fixed flex justify-between w-full px-8 sm:px-0 bottom-8 sm:relative sm:bottom-auto">
      <div>
        <Button
          type="button"
          elevation="lg"
          onClick={onSwitch}
        >
          <div className="px-8 py-2 uppercase">
            <Text>
              Teste
            </Text>
          </div>
        </Button>
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
