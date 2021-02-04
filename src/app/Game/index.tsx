import { useLocalStorageState } from '../common/hooks';
import { calculateNextPlayer, calculateStatus, calculateWinner } from './utils';
import { History, Board as BoardType, Position } from './types';
import Container from './Container';
import Restart from './Restart';
import Status from './Status';
import Board from './Container/Board';
import List from './Container/List';

const CURRENT_STEP_INITIAL = 0;
const HISTORY_INITIAL: History = [Array.from({ length: 9 }, () => null)];

const Game = () => {
  const [history, setHistory] = useLocalStorageState<History>('tic-tac-toe:history', HISTORY_INITIAL);
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:currentStep', CURRENT_STEP_INITIAL);

  const currentBoard = history[currentStep];
  const winner = calculateWinner(currentBoard);
  const nextPlayer = calculateNextPlayer(currentBoard);
  const status = calculateStatus(winner, currentBoard, nextPlayer);

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
    <div className="grid gap-8 sm:p-8">
      <Status>
        {status}
      </Status>
      <Container>
        <Board
          board={currentBoard}
          onSelectPosition={(position) => (
            handleSelectPosition(position, currentBoard, winner, currentStep, nextPlayer)
          )}
        />
        <List
          history={history}
          currentStep={currentStep}
          onSelectStep={(step) => handleSelectStep(step)}
        />
      </Container>
      <Restart onRestartClick={() => handleRestartClick(HISTORY_INITIAL, CURRENT_STEP_INITIAL)}>
        restart
      </Restart>
    </div>
  );
};

export default Game;
