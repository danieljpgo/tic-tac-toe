import * as React from 'react';
import type { Display, Position, Board as BoardType } from '../../common/types';
import { useGame } from './useGame';
import Actions from './Actions';
import Status from './Status';
import Panel from './GamePanel';
import Board from './Panel/Board';
import List from './Panel/List';

const Game = () => {
  const [display, setDisplay] = React.useState<Display>('game');
  const [{
    step,
    board,
    status,
    history,
    hasWinner,
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
    winner: boolean,
    nextPlayer: Position,
  ) {
    if (winner || board[position]) return;

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
      <Status>{status}</Status>
      <Panel display={display}>
        <Board
          board={board}
          player={player}
          onSelectPosition={(position) => handleSelectPosition(
            position, board, hasWinner, player,
          )}
        />
        <List
          step={step}
          history={history}
          onSelectStep={handleSelectStep}
        />
      </Panel>
      <Actions
        display={display}
        onRestartClick={handleRestartClick}
        onSwitchDisplayClick={handleSwitchDisplayClick}
      />
    </div>
  );
};

export default Game;
