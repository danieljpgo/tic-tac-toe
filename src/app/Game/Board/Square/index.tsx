import { Square as SquareType } from '../../types';

interface Props {
  children: SquareType;
  onSelectPosition: () => void;
}

const Square = (props: Props) => {
  const { children, onSelectPosition } = props;

  return (
    <button
      type="button"
      style={{ fontSize: 36 }}
      onClick={onSelectPosition}
    >
      {children}
    </button>
  );
};

export default Square;
