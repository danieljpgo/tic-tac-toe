import * as React from 'react';
import { calculateNextValue, calculateStatus, calculateWinner } from './utils';
import { History, Squares, Square } from './types';
import Steps from './Steps';
import Board from './Board';
import { useLocalStorageState } from '../common/hooks';

const historyDefault: History = [Array.from({ length: 9 }, () => null)];
const currentStepDefault = 0;

const Game = () => {
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:currentStep', currentStepDefault);
  const [history, setHistory] = useLocalStorageState<History>('tic-tac-toe:history', historyDefault);

  const currentSquares = history[currentStep];
  const winner = calculateWinner(currentSquares);
  const nextValue = calculateNextValue(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  function handleSelectStep(step: number) {
    setCurrentStep(step);
  }

  function handleRestartClick(defaultHistory: History, defaultStep: number) {
    setHistory(defaultHistory);
    setCurrentStep(defaultStep);
  }

  function handleSquaresChange(
    position: number,
    squares: Squares,
    winnerArg: Square,
    currentStepArg: number,
    nextValueArg: Square,
  ) {
    if (!winnerArg && !squares[position]) {
      const newHistory = history.slice(0, currentStepArg + 1);
      const newSquares = squares.map((value, index) => (index === position ? nextValueArg : value));
      setHistory([...newHistory, newSquares]);
      setCurrentStep(newHistory.length);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <div style={{ display: 'grid', placeItems: 'center', gap: 32 }}>
        <Board
          squares={currentSquares}
          onSelectPosition={(position) => handleSquaresChange(
            position,
            currentSquares,
            winner,
            currentStep,
            nextValue,
          )}
        />
        <button
          type="button"
          onClick={() => handleRestartClick(
            historyDefault,
            currentStepDefault,
          )}
        >
          Restart
        </button>
      </div>
      <div>
        <div>{status}</div>
        <Steps
          history={history}
          currentStep={currentStep}
          onSelectStep={(step) => handleSelectStep(step)}
        />
      </div>
    </div>
  );
};

export default Game;
