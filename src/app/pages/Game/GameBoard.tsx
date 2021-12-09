import type { Board, Player } from '../../../lib/tictactoe';
import GameBoardPosition from './GameBoardPosition';

type GameBoardProps = {
  board: Board;
  player: Player;
  onSelectPosition: (position: number) => void;
}

export default function GameBoard(props: GameBoardProps) {
  const { board, player, onSelectPosition } = props;

  return (
    <div className="grid items-center h-screen sm:pl-2 sm:pt-0 justify-self-center sm:h-auto sm:block">
      <ol
        className="grid w-48 h-48 grid-cols-3 grid-rows-3 gap-2"
        aria-label="tic-tac-toe-board"
      >
        {board.map((position, index) => (
          <GameBoardPosition
            key={index.toString()}
            index={index}
            position={position}
            player={player}
            onSelectPosition={() => onSelectPosition(index)}
          />
        ))}
      </ol>
    </div>
  );
}
