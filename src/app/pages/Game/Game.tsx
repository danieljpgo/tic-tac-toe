import * as React from 'react';
import type { Position, Board as BoardType } from '../../../lib/tictactoe';
import type { Display } from '../../common/types/display';
import { useGame } from './useGame';
import GameBoard from './GameBoard';
import GamePanel from './GamePanel';
import GameStatus from './GameStatus';
import GameActions from './GameActions';
import GameRollback from './GameRollback';

export default function Game() {
  const [display, setDisplay] = React.useState<Display>('game');
  const [{
    step,
    board,
    status,
    history,
    winner,
    player,
  }, dispatch] = useGame();

  function handleSwitchDisplayClick() {
    setDisplay((prev) => (prev === 'game' ? 'list' : 'game'));
  }

  function handleSelectStep(selectedStep: number) {
    dispatch({ type: 'SELECT_STEP', step: selectedStep });
  }

  function handleRestartClick() {
    dispatch({ type: 'RESTART' });
  }

  function handleSelectPosition(
    position: number,
    currentBoard: BoardType,
    hasWinner: boolean,
    nextPlayer: Position,
  ) {
    if (hasWinner || board[position]) return;

    dispatch({
      type: 'SELECT_POSITION',
      payload: {
        board: currentBoard,
        position,
        player: nextPlayer,
      },
    });
  }

  return (
    <div className="grid gap-4 sm:p-8">
      <GameStatus
        status={status}
        player={player}
        winner={winner}
      />
      <GamePanel display={display}>
        <GameBoard
          board={board}
          player={player}
          onSelectPosition={(position) => handleSelectPosition(
            position, board, Boolean(winner), player,
          )}
        />
        <GameRollback
          step={step}
          history={history}
          onSelectStep={handleSelectStep}
        />
      </GamePanel>
      <GameActions
        display={display}
        onRestartClick={handleRestartClick}
        onSwitchDisplayClick={handleSwitchDisplayClick}
      />
    </div>
  );
}
