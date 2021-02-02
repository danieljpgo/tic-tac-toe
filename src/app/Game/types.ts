const players = {
  x: 'X',
  o: 'O',
} as const;

export type Player = typeof players[keyof typeof players]

export type Position = Player | null;

export type Board = Position[];

export type History = Board[];
