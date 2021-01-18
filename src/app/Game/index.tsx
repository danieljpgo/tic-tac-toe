import * as React from 'react';
import { useLocalStorageState } from '../common/hooks';
import { calculateNextValue, calculateStatus, calculateWinner } from './utils';
import { History, Board as BoardType, Square } from './types';
import List from './List';
import Board from './Board';
import Status from './Status';
import Actions from './Actions';

const CURRENT_STEP_INITIAL = 0;
const HISTORY_INITIAL: History = [Array.from({ length: 9 }, () => null)];

const Game = () => {
  const [history, setHistory] = useLocalStorageState<History>('tic-tac-toe:history', HISTORY_INITIAL);
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:currentStep', CURRENT_STEP_INITIAL);

  const currentBoard = history[currentStep];
  const winner = calculateWinner(currentBoard);
  const nextValue = calculateNextValue(currentBoard);
  const [label, player] = calculateStatus(winner, currentBoard, nextValue).split(':');

  function handleSelectStep(step: number) {
    setCurrentStep(step);
  }

  function handleRestartClick(defaultHistory: History, defaultStep: number) {
    setHistory(defaultHistory);
    setCurrentStep(defaultStep);
  }

  function handleSelectPosition(
    position: number,
    board: BoardType,
    winnerArg: Square,
    currentStepArg: number,
    nextValueArg: Square,
  ) {
    if (!winnerArg && !board[position]) {
      const newHistory = history.slice(0, currentStepArg + 1);
      const newSquares = board.map((square, index) => (index === position ? nextValueArg : square));
      setHistory([...newHistory, newSquares]);
      setCurrentStep(newHistory.length);
    }
  }

  return (
    <div className="h-screen relative overflow-auto">
      {/* grid gap-6 */}
      {/* <div className=""> */}
      <Status
        label={label}
        player={player}
      />
      <div className="grid gap-6 px-6">
        <Board
          board={currentBoard}
          onSelectPosition={(position) => handleSelectPosition(
            position,
            currentBoard,
            winner,
            currentStep,
            nextValue,
          )}
        />
        <List
          history={history}
          currentStep={currentStep}
          onSelectStep={(step) => handleSelectStep(step)}
        />
      </div>
      <Actions onRestartClick={() => handleRestartClick(
        HISTORY_INITIAL,
        CURRENT_STEP_INITIAL,
      )}
      />
      {/* </div> */}
    </div>
  );
};

export default Game;
