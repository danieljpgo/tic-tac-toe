import type {
  History,
  Board as BoardType,
  Position,
  Display,
} from '../../common/types/game';
import { calculateNextPlayer, calculateStatus, calculateWinner } from './utils';
import { useLocalStorageState } from '../../common/utils/hooks';
import Actions from './Actions';
import Status from './Status';
import Board from './Board';
import Panel from './Panel';
import List from './List';

const CURRENT_STEP_INITIAL = 0;
const HISTORY_INITIAL: History = [Array.from({ length: 9 }, () => null)];

const Game = () => {
  const [history, setHistory] = useLocalStorageState<History>('tic-tac-toe:history', HISTORY_INITIAL);
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:currentStep', CURRENT_STEP_INITIAL);
  const [display, setDisplay] = useLocalStorageState<Display>('tic-tac-toe:display', 'game');

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
      <Status>
        {status}
      </Status>
      <Panel
        display={display}
        left={(
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
        )}
        right={(
          <List
            history={history}
            currentStep={currentStep}
            onSelectStep={(step) => handleSelectStep(step)}
          />
        )}
      />
      <Actions
        onRestartClick={() => handleRestartClick(
          HISTORY_INITIAL,
          CURRENT_STEP_INITIAL,
        )}
        onSwitch={() => handleSwitchDisplay()}
      />
    </div>
  );
};

export default Game;
