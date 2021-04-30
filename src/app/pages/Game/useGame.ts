import * as React from 'react';
import { calculate } from '../../common/utils/helpers/calculate';
import { Board, History, Position } from '../../common/types';

type Game = {
  history: History;
  currentStep: number;
}

const initialState: Game = {
  history: [Array.from({ length: 9 }, () => null)],
  currentStep: 0,
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
        currentStep: initialState.currentStep,
      };

    case 'SELECT_STEP':
      return {
        history: state.history,
        currentStep: action.step,
      };

    case 'SELECT_POSITION':
      return {
        currentStep: state.history.slice(0, state.currentStep + 1).length,
        history: [
          ...state.history.slice(0, state.currentStep + 1),
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
  const [{ currentStep, history }, dispatch] = React.useReducer(gameReducer, initialState);

  const currentBoard = history[currentStep];
  const winner = calculate.winner(currentBoard);
  const nextPlayer = calculate.nextPlayer(currentBoard);
  const status = calculate.status(winner, currentBoard, nextPlayer);

  return [{
    winner,
    status,
    history,
    nextPlayer,
    currentStep,
    currentBoard,
  }, dispatch] as const;
};

export { useGame };
