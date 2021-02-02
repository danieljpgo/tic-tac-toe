import Text from '../../../common/components/Text';
import { Children } from '../../../common/types';
import { Square } from '../../types';

interface Props extends Children {
  disabled: boolean;
  currentStep: boolean;
  currentPlayer: Square;
  onSelectStep: () => void;
}

const Step = (props: Props) => {
  const {
    children,
    disabled,
    currentStep,
    currentPlayer,
    onSelectStep,
  } = props;

  return (
    <li className="flex gap-2">
      {currentStep && (
        <div className={`h-2 w-2 bg-gradient-to-b rounded-full self-center ${currentPlayer === 'X' ? 'from-blue-100 via-blue-400 to-purple-500' : 'from-pink-100 via-pink-400 to-red-500'}`} />
      )}
      <button
        type="button"
        disabled={disabled}
        className="flex w-full px-4 py-2 bg-white rounded-lg shadow-md"
        onClick={onSelectStep}
      >
        <Text size="small">
          {children}
        </Text>
      </button>
    </li>
  );
};

export default Step;
