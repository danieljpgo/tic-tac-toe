import { Board, Square } from './types';

export function calculateStatus(winner: Square, board: Board, nextValue: Square) {
  const winnerText = `Winner: ${winner}`;
  const scratchText = 'Scratch: Cat\'s game';
  const nextPlayerText = `Next Player is: ${nextValue}`;

  if (winner) {
    return winnerText;
  }
  return board.every((square) => Boolean(square))
    ? scratchText
    : nextPlayerText;
}

export function calculateNextValue(board: Board) {
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
  ];

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
