import {
  PADDING,
  SQUARE_SIZE,
} from './contants';
import { Square } from './Square';

export type State = {
  turn: 'x' | 'o';
  winner: null | 'x' | 'o';
  squares: Array<Square>;
  status: 'playing' | 'finished'
}

export function newGame (): State {
  const squares: Array<Square> = [];

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      const x = i + (SQUARE_SIZE * i) + PADDING + 10;
      const y = j + (SQUARE_SIZE * j) + PADDING + 10;

      squares.push(new Square(x, y))
    }
  }
    

  return {
    turn: 'x',
    winner: null,
    squares: squares,
    status: 'playing'
  }
}