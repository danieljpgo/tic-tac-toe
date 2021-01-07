import { Squares } from '../types';
import Position from './Position';

interface Props {
  squares: Squares;
  onSelectPosition: (position: number) => void;
}

const Board = (props: Props) => {
  const { squares, onSelectPosition } = props;

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 60px)',
        gridAutoRows: 60,
        gap: 8,
      }}
      >
        {squares.map((square, index) => (
          <Position
            key={index.toString()}
            onSelectPosition={() => onSelectPosition(index)}
          >
            {square}
          </Position>
        ))}
      </div>
    </div>
  );
};

export default Board;
