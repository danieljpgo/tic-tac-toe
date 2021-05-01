import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { createMatchMedia, resize } from './common/utils/helpers';
import App from '.';

beforeEach(() => {
  window.localStorage.clear();
  window.matchMedia = createMatchMedia({ width: window.innerWidth, height: window.innerHeight });
});

test('can play a game of tic tac toe', () => {
  render(<App />);

  const [
    p1, p2, p3,
    p4, p5, p6,
    p7, p8, p9,
  ] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p8);
  expect(p8).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p7);
  expect(p7).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p9);
  expect(p9).toHaveTextContent(/x player mark/i);
});

test('no more moves may be played after game is over', () => {
  render(<App />);

  const [
    p1, p2, p3,
    p4, p5, p6,
  ] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent('unmarked');
});

test('game is over with no winner', () => {
  render(<App />);

  const [
    p1, p2, p3,
    p4, p5, p6,
    p7, p8, p9,
  ] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p3);
  expect(p3).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p4);
  expect(p4).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p6);
  expect(p6).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p5);
  expect(p5).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p7);
  expect(p7).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p9);
  expect(p9).toHaveTextContent(/circle player mark/i);

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p8);
  expect(p8).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/Scratch: Cat's game/i)).toBeInTheDocument();
});

test('restarting the game', () => {
  render(<App />);

  const [p1, p2] = Array.from(screen.queryAllByRole('button'));

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p1);
  expect(p1).toHaveTextContent(/x player mark/i);

  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  userEvent.click(p2);
  expect(p2).toHaveTextContent(/circle player mark/i);

  userEvent.click(screen.getByText(/restart/i));

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
});

test('select a step to return to the starting point', () => {
  render(<App />);

  const [p1, p2] = Array.from(screen.queryAllByRole('button'));

  const defaultStep = screen.getByRole('button', { name: /go to game start/i });
  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  expect(defaultStep).toHaveAttribute('disabled');
  expect(defaultStep).toHaveTextContent('*');

  userEvent.click(p1);
  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
  expect(p1).toHaveTextContent(/x player mark/i);

  const firstStep = screen.getByRole('button', { name: /go to move #1/i });
  expect(defaultStep).not.toHaveAttribute('disabled');
  expect(defaultStep).not.toHaveTextContent('*');
  expect(firstStep).toHaveAttribute('disabled');
  expect(firstStep).toHaveTextContent('*');

  userEvent.click(p2);
  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  expect(p2).toHaveTextContent(/circle player mark/i);

  const secondStep = screen.getByRole('button', { name: /go to move #2/i });
  expect(defaultStep).not.toHaveAttribute('disabled');
  expect(defaultStep).not.toHaveTextContent('*');
  expect(firstStep).not.toHaveAttribute('disabled');
  expect(firstStep).not.toHaveTextContent('*');
  expect(secondStep).toHaveAttribute('disabled');
  expect(secondStep).toHaveTextContent('*');

  userEvent.click(defaultStep);
  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
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

  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  userEvent.click(p1);

  expect(p1).toHaveTextContent(/x player mark/i);
  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();

  rerender(<App key="new" />);

  expect(p1).toHaveTextContent(/x player mark/i);
  expect(screen.getByText(/circle player status/i)).toBeInTheDocument();
});

test('only on mobile should display a button to togle between board and list of steps', () => {
  const { rerender } = render(<App />);
  expect(screen.queryByRole('button', { name: /steps/i })).not.toBeInTheDocument();

  resize({ width: 400 });

  rerender(<App key="new" />);
  expect(screen.getByRole('button', { name: /steps/i })).toBeInTheDocument();
});
