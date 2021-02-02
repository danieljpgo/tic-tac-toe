import { Board as BoardType } from '../../types';
import Position from './Position';

interface Props {
  board: BoardType;
  onSelectPosition: (position: number) => void;
}

const Board = (props: Props) => {
  const { board, onSelectPosition } = props;

  return (
    <div className="px-2 pt-20 sm:pt-0 justify-self-center">
      <div className="grid w-48 h-48 grid-cols-3 grid-rows-3 gap-2">
        {board.map((position, index) => (
          <Position
            key={index.toString()}
            onSelectPosition={() => onSelectPosition(index)}
          >
            {position}
          </Position>
        ))}
      </div>
    </div>
  );
};

export default Board;
