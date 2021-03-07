import { players } from '../utils/constants/game';

export type Player = typeof players[keyof typeof players]

export type Position = Player | null;

export type Board = Position[];

export type History = Board[];

export type Display = 'game' | 'list';
