import Button from '../../../common/components/Button';
import Text from '../../../common/components/Text';

interface Props {
  children: string;
  onRestartClick: () => void;
}

const Restart = (props: Props) => {
  const { children, onRestartClick } = props;

  return (
    <div className="fixed justify-self-end bottom-8 right-8 sm:bottom-auto sm:right-auto sm:relative">
      <Button
        type="button"
        elevation="lg"
        onClick={onRestartClick}
      >
        <div className="px-8 py-2 uppercase">
          <Text>
            {children}
          </Text>
        </div>
      </Button>
    </div>
  );
};

export default Restart;
