import type { Children, Player } from '../../../../../common/types';
import { gradients } from '../../../../../common/utils/constants';
import Text from '../../../../../common/components/Text';

interface Props extends Children {
  step: boolean;
  player: Player;
  disabled: boolean;
  onSelectStep: () => void;
}

const Step = (props: Props) => {
  const {
    step,
    player,
    disabled,
    children,
    onSelectStep,
  } = props;

  return (
    <li className="flex gap-2">
      {step && (
        <div className={`h-2 w-2 bg-gradient-to-b rounded-full self-center ${gradients[player]}`} />
      )}
      <button
        className="flex w-full px-4 py-2 bg-white rounded-lg shadow-md focus:outline-none"
        type="button"
        disabled={disabled}
        onClick={onSelectStep}
      >
        <Text variant="sub">
          {children}
        </Text>
      </button>
    </li>
  );
};

export default Step;
