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
      className="text-4xl bg-white rounded-lg shadow-md active:shadow disabled:shadow-md focus:outline-none"
      disabled={Boolean(children)}
      onClick={onSelectPosition}
    >
      <span className={`text-gradient font-light bg-gradient-to-b ${children === 'O' ? 'from-pink-100 via-pink-400 to-red-500' : 'from-blue-100 via-blue-400 to-purple-500'}`}>
        {children}
      </span>
    </button>
  );
};

export default Square;
