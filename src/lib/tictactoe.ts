export const players = {
  x: 'x',
  o: 'o',
} as const;

export type Player = typeof players[keyof typeof players]

export type Position = Player | null;

export type Board = Array<Position>;

export type History = Array<Board>;

export function calculateStatus(winner: Position, board: Board, player: Player) {
  if (winner) {
    return 'winner';
  }
  if (board.every(Boolean)) {
    return 'draw';
  }
  return 'next';
}

export function calculateNextPlayer(board: Board) : Player {
  const xSquaresCount = board.filter((r) => r === players.x).length;
  const oSquaresCount = board.filter((r) => r === players.o).length;

  return oSquaresCount === xSquaresCount
    ? players.x
    : players.o;
}

export function calculateWinner(board: Board) : Position {
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
    .map(([a, b, c]) => (
      board[a] && board[a] === board[b] && board[a] === board[c]
        ? board[a]
        : null))
    .filter(Boolean);

  return winner;
}
