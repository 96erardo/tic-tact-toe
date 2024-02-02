export type State = {
  turn: 'x' | 'o';
  winner: null | 'x' | 'o';
  squares: Array<string>;
  status: 'playing' | 'finished'
}

