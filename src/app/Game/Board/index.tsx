import { Board as BoardType } from '../types';
import Square from './Square';

interface Props {
  board: BoardType;
  onSelectPosition: (position: number) => void;
}

const Board = (props: Props) => {
  const { board, onSelectPosition } = props;

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 60px)',
        gridAutoRows: 60,
        gap: 8,
      }}
      >
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
