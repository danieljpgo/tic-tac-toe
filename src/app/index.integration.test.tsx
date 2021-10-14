import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { createMatchMedia, resize } from '../lib/test';
import App from '.';

beforeEach(() => {
  window.localStorage.clear();
  window.matchMedia = createMatchMedia({ width: window.innerWidth, height: window.innerHeight });
});

test('can play a game of tic tac toe', () => {
  render(<App />);

  const [
    p1, p2, p3, // x o x
    p4, p5, p6, // o x o
    p7, p8, p9, // o x x
  ] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p8);
  expect(p8).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p7);
  expect(p7).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p9);
  expect(p9).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/winner:/i)).toBeInTheDocument();
  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
});

test('no more moves may be played after game is over', () => {
  render(<App />);

  const [
    p1, p2, p3, // x x x
    p4, p5, p6, // o o -
  ] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent('unmarked');

  expect(screen.getByText(/winner:/i)).toBeInTheDocument();
  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
});

test('game is over with no winner', () => {
  render(<App />);

  const [
    p1, p2, p3,
    p4, p5, p6,
    p7, p8, p9,
  ] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p7);
  expect(p7).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p9);
  expect(p9).toHaveTextContent(/selected by player circle/i);

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p8);
  expect(p8).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/Scratch: Cat's game/i)).toBeInTheDocument();
});

test('restarting the game', () => {
  render(<App />);

  const [p1, p2] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/selected by player x/i);

  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/selected by player circle/i);

  userEvent.click(screen.getByText(/restart/i));

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
});

test('select a step to return to the starting point', () => {
  render(<App />);

  const [p1, p2] = Array.from(screen.queryAllByRole('button'));

  const defaultStep = screen.getByRole('button', { name: /go to game start/i });
  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  expect(defaultStep).toHaveAttribute('disabled');
  expect(defaultStep).toHaveTextContent('*');

  userEvent.click(p1);
  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
  expect(p1).toHaveTextContent(/selected by player x/i);

  const firstStep = screen.getByRole('button', { name: /go to move #1/i });
  expect(defaultStep).not.toHaveAttribute('disabled');
  expect(defaultStep).not.toHaveTextContent('*');
  expect(firstStep).toHaveAttribute('disabled');
  expect(firstStep).toHaveTextContent('*');

  userEvent.click(p2);
  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  expect(p2).toHaveTextContent(/selected by player circle/i);

  const secondStep = screen.getByRole('button', { name: /go to move #2/i });
  expect(defaultStep).not.toHaveAttribute('disabled');
  expect(defaultStep).not.toHaveTextContent('*');
  expect(firstStep).not.toHaveAttribute('disabled');
  expect(firstStep).not.toHaveTextContent('*');
  expect(secondStep).toHaveAttribute('disabled');
  expect(secondStep).toHaveTextContent('*');

  userEvent.click(defaultStep);
  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  expect(p1).toHaveTextContent('unmarked');
  expect(p2).toHaveTextContent('unmarked');
  expect(defaultStep).toHaveAttribute('disabled');
  expect(defaultStep).toHaveTextContent('*');
  expect(firstStep).not.toHaveAttribute('disabled');
  expect(firstStep).not.toHaveTextContent('*');
  expect(secondStep).not.toHaveAttribute('disabled');
  expect(secondStep).not.toHaveTextContent('*');
});

test('progress is saved even when reloading the page', () => {
  const { rerender } = render(<App />);

  const [p1] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/player x status/i)).toBeInTheDocument();
  userEvent.click(p1);

  expect(p1).toHaveTextContent(/selected by player x/i);
  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();

  rerender(<App key="reload_page" />);

  expect(p1).toHaveTextContent(/selected by player x/i);
  expect(screen.getByText(/player circle status/i)).toBeInTheDocument();
});

test('only on mobile should display a button to toggle between board and list of steps', () => {
  const { rerender } = render(<App />);
  expect(screen.queryByRole('button', { name: /steps/i })).not.toBeInTheDocument();

  resize({ width: 400 });

  rerender(<App key="new_render" />);
  expect(screen.getByRole('button', { name: /steps/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /steps/i }));
  expect(screen.getByRole('button', { name: /board/i })).toBeInTheDocument();
});
