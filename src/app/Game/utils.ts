import type { Board, Position, Player } from './types';

export function calculateStatus(winner: Position, board: Board, nextPlayer: Player) {
  const text = {
    winner: `Winner: ${winner}`,
    scratch: 'Scratch: Cat\'s game',
    nextPlayer: `Next Player: ${nextPlayer}`,
  } as const;

  if (winner) {
    return text.winner;
  }

  return board.every((square) => Boolean(square))
    ? text.scratch
    : text.nextPlayer;
}

export function calculateNextPlayer(board: Board) {
  const xSquaresCount = board.filter((r) => r === 'X').length;
  const oSquaresCount = board.filter((r) => r === 'O').length;
  return oSquaresCount === xSquaresCount
    ? 'X'
    : 'O';
}

export function calculateWinner(board: Board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as const;

  const [winner] = lines
    .map((row) => {
      const [a, b, c] = row;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
      return null;
    })
    .filter((square) => Boolean(square));

  return winner;
}
