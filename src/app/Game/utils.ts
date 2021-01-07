import { Squares, Square } from './types';

// @TODO Add documentation

export function calculateStatus(winner: Square, squares: Squares, nextValue: Square) {
  if (winner) {
    return `Winner: ${winner}`;
  }
  if (squares.every((value) => Boolean(value))) {
    return 'Scratch: Cat\'s game';
  }
  return `Next player: ${nextValue}`;
}

export function calculateNextValue(squares: Squares) {
  const xSquaresCount = squares.filter((r) => r === 'X').length;
  const oSquaresCount = squares.filter((r) => r === 'O').length;

  return oSquaresCount === xSquaresCount
    ? 'X'
    : 'O';
}

export function calculateWinner(squares: Squares) {
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

  const [winner] = lines.map((value) => {
    const [a, b, c] = value;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    return null;
  })
    .filter((value) => Boolean(value));

  return winner;
}
