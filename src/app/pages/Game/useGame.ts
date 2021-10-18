import type { Board, History, Position } from '../../common/types';
import { useLocalStorageReducer } from '../../common/hooks';
import { calculateNextPlayer, calculateStatus, calculateWinner } from '../../common/utils/helpers';

type Game = {
  history: History;
  step: number;
}

type GameActions =
| { type: 'RESTART' }
| { type: 'SELECT_STEP', step: number }
| { type: 'SELECT_POSITION', payload: { position: number, board: Board, player: Position }}

const initialState: Game = {
  history: [Array.from({ length: 9 }, () => null)],
  step: 0,
};

function gameReducer(state: typeof initialState = initialState, action: GameActions) {
  switch (action.type) {
    case 'RESTART':
      return {
        history: initialState.history,
        step: initialState.step,
      };

    case 'SELECT_STEP':
      return {
        history: state.history,
        step: action.step,
      };

    case 'SELECT_POSITION':
      return {
        step: state.history.slice(0, state.step + 1).length,
        history: [
          ...state.history.slice(0, state.step + 1),
          action.payload.board.map((square, i) => (
            i === action.payload.position
              ? action.payload.player
              : square)),
        ],
      };

    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

export function useGame() {
  const [{ step, history }, dispatch] = useLocalStorageReducer('tic-tac-toe:game', gameReducer, initialState);

  const board = history[step];
  const winner = calculateWinner(board);
  const player = calculateNextPlayer(board);
  const status = calculateStatus(winner, board, player);

  return [{
    step,
    board,
    status,
    history,
    hasWinner: Boolean(winner),
    player,
  }, dispatch] as const;
}
