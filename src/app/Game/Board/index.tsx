import { Board as BoardType } from '../types';
import Square from './Square';

interface Props {
  board: BoardType;
  onSelectPosition: (position: number) => void;
}

const Board = (props: Props) => {
  const { board, onSelectPosition } = props;

  return (
    <div className="h-48 w-48 grid grid-cols-3 grid-rows-3 gap-2 self-center justify-self-end">
      {board.map((square, index) => (
        <Square
          key={index.toString()}
          onSelectPosition={() => onSelectPosition(index)}
        >
          {square}
        </Square>
      ))}
    </div>
  );
};

export default Board;
