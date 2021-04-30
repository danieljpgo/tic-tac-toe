import * as React from 'react';
import type { Display, Position, Board as BoardType } from '../../common/types';
import Actions from './Actions';
import Status from './Status';
import Panel from './Panel';
import Board from './Panel/Board';
import List from './Panel/List';
import { useGame } from './useGame';

const Game = () => {
  const [display, setDisplay] = React.useState<Display>('game');
  const [{
    winner,
    status,
    history,
    nextPlayer,
    currentStep,
    currentBoard,
  }, dispatch] = useGame();

  function handleSwitchDisplayClick() {
    setDisplay((prev) => (prev === 'game' ? 'list' : 'game'));
  }

  function handleSelectStep(step: number) {
    dispatch({ type: 'SELECT_STEP', step });
  }

  function handleRestartClick() {
    dispatch({ type: 'RESTART' });
  }

  function handleSelectPosition(
    position: number,
    board: BoardType,
    winnerArg: Position,
    nextPlayerArg: Position,
  ) {
    if (winnerArg || board[position]) return;

    dispatch({
      type: 'SELECT_POSITION',
      payload: {
        board,
        position,
        nextPlayer: nextPlayerArg,
      },
    });
  }

  return (
    <div className="grid gap-4 sm:p-8">
      <Status>{status}</Status>
      <Panel display={display}>
        <Board
          board={currentBoard}
          nextPlayer={nextPlayer}
          onSelectPosition={(position) => handleSelectPosition(
            position,
            currentBoard,
            winner,
            nextPlayer,
          )}
        />
        <List
          history={history}
          currentStep={currentStep}
          onSelectStep={(step) => handleSelectStep(step)}
        />
      </Panel>
      <Actions
        display={display}
        onRestartClick={() => handleRestartClick()}
        onSwitchDisplayClick={() => handleSwitchDisplayClick()}
      />
    </div>
  );
};

export default Game;

// const [history, setHistory] =
// useLocalStorageState<History>('tic-tac-toe:history', historyInitial);
// const [currentStep, setCurrentStep] =
// useLocalStorageState('tic-tac-toe:currentStep', currentStepInitial);
// import { useLocalStorageState } from '../../common/utils/hooks';
