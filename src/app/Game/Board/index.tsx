import { Board as BoardType } from '../types';
import Square from './Square';

interface Props {
  board: BoardType;
  onSelectPosition: (position: number) => void;
}

const Board = (props: Props) => {
  const { board, onSelectPosition } = props;

  return (
    <div className="px-2 pt-20 sm:pt-0 justify-self-center">
      <div className="grid w-48 h-48 grid-cols-3 grid-rows-3 gap-2">
        {board.map((square, index) => (
          <Square
            key={index.toString()}
            onSelectPosition={() => onSelectPosition(index)}
          >
            {square}
          </Square>
        ))}
      </div>
    </div>
  );
};

export default Board;
