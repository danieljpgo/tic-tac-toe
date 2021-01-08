import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from './index';

beforeEach(() => {
  window.localStorage.clear();
});

test('can play a game of tic tac toe', () => {
  render(<Game />);

  const [
    p1, p2, p3, // x o x
    p4, p5, p6, // o x o
    p7, p8, p9, // o x x
  ] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x/i);

  expect(screen.getByText(/next player: o/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/o/i);

  expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/x/i);

  expect(screen.getByText(/next player: o/i)).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/o/i);

  expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/x/i);

  expect(screen.getByText(/next player: o/i)).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent(/o/i);

  expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  userEvent.click(p8);
  expect(p8).toHaveTextContent(/x/i);

  expect(screen.getByText(/next player: o/i)).toBeInTheDocument();
  userEvent.click(p7);
  expect(p7).toHaveTextContent(/o/i);

  expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  userEvent.click(p9);
  expect(p9).toHaveTextContent(/x/i);
});

test('no more moves may be played after game is over', () => {
  render(<Game />);

  const [
    p1, p2, p3,
    p4, p5, p6,
  ] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x/i);

  expect(screen.getByText(/next player: o/i)).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/o/i);

  expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/x/i);

  expect(screen.getByText(/next player: o/i)).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/o/i);

  expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/x/i);

  expect(screen.getByText(/winner: x/i)).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent('');
});

