import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByTextParent } from '../../common/utils/helpers';
import Game from './index';

beforeEach(() => {
  window.localStorage.clear();
});

if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 1;
}

test('can play a game of tic tac toe', () => {
  render(<Game />);

  const [
    p1, p2, p3, // x o x
    p4, p5, p6, // o x o
    p7, p8, p9, // o x x
  ] = Array.from(screen.queryAllByRole('button'));

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p8);
  expect(p8).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p7);
  expect(p7).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p9);
  expect(p9).toHaveTextContent(/x mark/i);
});

test('no more moves may be played after game is over', () => {
  render(<Game />);

  const [
    p1, p2, p3,
    p4, p5, p6,
  ] = Array.from(screen.queryAllByRole('button'));

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Winner:X')).toBeInTheDocument();

  userEvent.click(p6);
  expect(p6).toHaveTextContent('');
});

test('game is over with no winner', () => {
  render(<Game />);

  const [
    p1, p2, p3, // x o x
    p4, p5, p6, // o o x
    p7, p8, p9, // x x o
  ] = Array.from(screen.queryAllByRole('button'));

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p7);
  expect(p7).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p9);
  expect(p9).toHaveTextContent(/circle mark/i);

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p8);
  expect(p8).toHaveTextContent(/x mark/i);

  expect(screen.getByText(/Scratch: Cat's game/i)).toBeInTheDocument();
});

test('restarting the game', () => {
  render(<Game />);

  const [p1, p2] = Array.from(screen.queryAllByRole('button'));

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x mark/i);

  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/circle mark/i);

  userEvent.click(screen.getByText(/restart/i));

  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
});

test('select a step to return to the starting point', () => {
  render(<Game />);

  const [p1, p2] = Array.from(screen.queryAllByRole('button'));

  const defaultStep = screen.getByRole('button', { name: /go to game start/i });
  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  expect(defaultStep).toHaveAttribute('disabled');
  expect(defaultStep).toHaveTextContent('*');

  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x mark/i);
  expect(getByTextParent(screen, 'Next Player:O')).toBeInTheDocument();

  const firstStep = screen.getByRole('button', { name: /go to move #1/i });
  expect(defaultStep).not.toHaveAttribute('disabled');
  expect(defaultStep).not.toHaveTextContent('*');
  expect(firstStep).toHaveAttribute('disabled');
  expect(firstStep).toHaveTextContent('*');

  userEvent.click(p2);
  expect(p2).toHaveTextContent(/circle mark/i);
  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();

  const secondStep = screen.getByRole('button', { name: /go to move #2/i });
  expect(defaultStep).not.toHaveAttribute('disabled');
  expect(defaultStep).not.toHaveTextContent('*');
  expect(firstStep).not.toHaveAttribute('disabled');
  expect(firstStep).not.toHaveTextContent('curent');
  expect(secondStep).toHaveAttribute('disabled');
  expect(secondStep).toHaveTextContent('*');

  userEvent.click(defaultStep);
  expect(getByTextParent(screen, 'Next Player:X')).toBeInTheDocument();
  expect(p1).toHaveTextContent('');
  expect(p2).toHaveTextContent('');
  expect(defaultStep).toHaveAttribute('disabled');
  expect(defaultStep).toHaveTextContent('*');
  expect(firstStep).not.toHaveAttribute('disabled');
  expect(firstStep).not.toHaveTextContent('curent');
  expect(secondStep).not.toHaveAttribute('disabled');
  expect(secondStep).not.toHaveTextContent('*');
});
