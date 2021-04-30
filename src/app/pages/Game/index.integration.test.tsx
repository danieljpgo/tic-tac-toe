import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from '.';

beforeEach(() => {
  window.localStorage.clear();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('can play a game of tic tac toe', () => {
  render(<Game />);

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
  render(<Game />);

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
  render(<Game />);

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
  render(<Game />);

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
  render(<Game />);

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
  expect(firstStep).not.toHaveTextContent('curent');
  expect(secondStep).toHaveAttribute('disabled');
  expect(secondStep).toHaveTextContent('*');

  userEvent.click(defaultStep);
  expect(screen.getByText(/x player status/i)).toBeInTheDocument();
  expect(p1).toHaveTextContent('unmarked');
  expect(p2).toHaveTextContent('unmarked');
  expect(defaultStep).toHaveAttribute('disabled');
  expect(defaultStep).toHaveTextContent('*');
  expect(firstStep).not.toHaveAttribute('disabled');
  expect(firstStep).not.toHaveTextContent('curent');
  expect(secondStep).not.toHaveAttribute('disabled');
  expect(secondStep).not.toHaveTextContent('*');
});

// @TODO Local Storage Test