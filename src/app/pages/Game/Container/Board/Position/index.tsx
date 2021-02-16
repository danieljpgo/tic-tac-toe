import type { Position as PositionType } from '../../../../../common/types/game';
import Text from '../../../../../common/components/Text';

interface Props {
  children: PositionType;
  onSelectPosition: () => void;
}

const Position = (props: Props) => {
  const { children, onSelectPosition } = props;

  return (
    <button
      className="bg-white rounded-lg shadow-md active:shadow disabled:shadow-md focus:outline-none"
      type="button"
      disabled={Boolean(children)}
      onClick={onSelectPosition}
    >
      {children && (
        <Text variant={children === 'X' ? 'gradient-blue' : 'gradient-pink'}>
          {children}
        </Text>
      )}
    </button>
  );
};

export default Position;
