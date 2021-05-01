import type { Board as BoardType, Player } from '../../../../common/types';
import Position from './Position';

interface Props {
  board: BoardType;
  nextPlayer: Player;
  onSelectPosition: (position: number) => void;
}

const Board = (props: Props) => {
  const { board, nextPlayer, onSelectPosition } = props;

  return (
    <div className="grid items-center h-screen sm:pl-2 sm:pt-0 justify-self-center sm:h-auto sm:block">
      <ol
        className="grid w-48 h-48 grid-cols-3 grid-rows-3 gap-2"
        aria-label="tic-tac-toe-board"
      >
        {board.map((position, index) => (
          <Position
            key={index.toString()}
            index={index}
            position={position}
            nextPlayer={nextPlayer}
            onSelectPosition={() => onSelectPosition(index)}
          />
        ))}
      </ol>
    </div>
  );
};

export default Board;
