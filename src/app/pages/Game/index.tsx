import * as React from 'react';
import type {
  Display,
  History,
  Position,
  Board as BoardType,
} from '../../common/types/game';
import { calculateNextPlayer, calculateStatus, calculateWinner } from './utils';
import { useLocalStorageState } from '../../common/utils/hooks';
import Actions from './Actions';
import Status from './Status';
import Panel from './Panel';
import Board from './Panel/Board';
import List from './Panel/List';

const CURRENT_STEP_INITIAL = 0;
const HISTORY_INITIAL: History = [Array.from({ length: 9 }, () => null)];

const Game = () => {
  const [display, setDisplay] = React.useState<Display>('game');
  const [history, setHistory] = useLocalStorageState<History>('tic-tac-toe:history', HISTORY_INITIAL);
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:currentStep', CURRENT_STEP_INITIAL);

  const currentBoard = history[currentStep];
  const winner = calculateWinner(currentBoard);
  const nextPlayer = calculateNextPlayer(currentBoard);
  const status = calculateStatus(winner, currentBoard, nextPlayer);

  function handleSelectStep(step: number) {
    setCurrentStep(step);
  }

  function handleSwitchDisplay() {
    setDisplay((prev) => (prev === 'game' ? 'list' : 'game'));
  }

  function handleRestartClick(defaultHistory: History, defaultStep: number) {
    setHistory(defaultHistory);
    setCurrentStep(defaultStep);
  }

  function handleSelectPosition(
    position: number,
    board: BoardType,
    winnerArg: Position,
    currentStepArg: number,
    nextPlayerArg: Position,
  ) {
    if (!winnerArg && !board[position]) {
      const newHistory = history.slice(0, currentStepArg + 1);
      const newSquares = board.map((square, index) => (
        index === position
          ? nextPlayerArg
          : square
      ));
      setHistory([...newHistory, newSquares]);
      setCurrentStep(newHistory.length);
    }
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
            currentStep,
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
        onSwitchDisplay={() => handleSwitchDisplay()}
        onRestartClick={() => handleRestartClick(
          HISTORY_INITIAL,
          CURRENT_STEP_INITIAL,
        )}
      />
    </div>
  );
};

export default Game;
