import { Square } from '../../types';

interface Props {
  children: Square;
  onSelectPosition: () => void;
}

const Position = (props: Props) => {
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

export default Position;
