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
      className="bg-white text-4xl rounded-md shadow-md active:shadow disabled:shadow-md focus:outline-none"
      disabled={Boolean(children)}
      onClick={onSelectPosition}
    >
      {children}
    </button>
  );
};

export default Square;
