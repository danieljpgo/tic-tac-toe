import type { Board, Position, Player } from '../../types';
import { players } from '../../constants';

export function calculateStatus(winner: Position, board: Board, player: Player) {
  if (winner) {
    return `Winner: ${winner}` as const;
  }
  return board.every((square) => Boolean(square))
    ? 'Scratch: Cat\'s game'
    : `Next Player: ${player}` as const;
}

export function calculateNextPlayer(board: Board) {
  const xSquaresCount = board.filter((r) => r === players.x).length;
  const oSquaresCount = board.filter((r) => r === players.o).length;
  return oSquaresCount === xSquaresCount
    ? players.x
    : players.o;
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
    .filter(Boolean);

  return winner;
}

const array = [
  { date: '20-11-2021', name: 'item 1' },
  { date: '20-11-2021', name: 'item 2' },
  { date: '26-11-2021', name: 'item 3' },
];

array.reduce((acc, { date, name }) => {
  if (acc.find((i) => i.date === date)) {
    return acc.map((i) => (
      i.date === date
        ? { ...i, names: [...i.names, name] }
        : i
    ));
  }

  return [...acc, { date, names: [name] }];
}, []);
