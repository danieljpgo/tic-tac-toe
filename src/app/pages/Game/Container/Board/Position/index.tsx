import type { Position as PositionType } from '../../../../../common/types/game';
import Text from '../../../../../common/components/Text';
import Button from '../../../../../common/components/Button';

interface Props {
  children: PositionType;
  onSelectPosition: () => void;
}

const Position = (props: Props) => {
  const { children, onSelectPosition } = props;

  return (
    <Button
      type="button"
      disabled={Boolean(children)}
      onClick={onSelectPosition}
    >
      {children && (
        <Text variant={children === 'X' ? 'gradient-blue' : 'gradient-pink'}>
          {children}
        </Text>
      )}
    </Button>
  );
};

export default Position;
