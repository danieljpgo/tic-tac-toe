import { players } from '../constants';

export type Player = typeof players[keyof typeof players]

export type Position = Player | null;

export type Board = Position[];

export type History = Board[];
