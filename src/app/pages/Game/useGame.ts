import * as React from 'react';
import { calculate } from '../../common/utils/helpers/calculate';
import type { Board, History, Position } from '../../common/types';

type Game = {
  history: History;
  step: number;
}

const initialState: Game = {
  history: [Array.from({ length: 9 }, () => null)],
  step: 0,
};

type GameActions =
  | { type: 'RESTART' }
  | { type: 'SELECT_STEP', step: number }
  | { type: 'SELECT_POSITION', payload: { position: number, board: Board, nextPlayer: Position } };

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
              ? action.payload.nextPlayer
              : square)),
        ],
      };

    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

const useGame = () => {
  const [{ step, history }, dispatch] = React.useReducer(gameReducer, initialState);

  const board = history[step];
  const winner = calculate.winner(board);
  const nextPlayer = calculate.nextPlayer(board);
  const status = calculate.status(winner, board, nextPlayer);

  return [{
    board,
    hasWinner: Boolean(winner),
    status,
    history,
    nextPlayer,
    step,
  }, dispatch] as const;
};

export { useGame };
