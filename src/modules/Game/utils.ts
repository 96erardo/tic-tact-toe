import { Square } from './Square';

export function getGameWinner (squares: Array<Square>): null | 'x' | 'o' {
  let winner: null | 'x' | 'o' = null;

  // Evaluate rows & columns
  [0, 1, 2].some(i => {
    const row = squares.slice(i * 3, i * 3 + 3);
    const column = [squares[i], squares[i + 3], squares[i + 6]];
    
    const r = row.reduce((acum, square) => {
      return acum + square.value
    }, '')

    if (r === 'xxx' || r === 'ooo') {
      winner = r === 'xxx' ? 'x' : 'o';
      return true;
    }

    const c = column.reduce((acum, square) => {
      return acum + square.value
    }, '')

    if (c === 'xxx' || c === 'ooo') {
      winner = c === 'xxx' ? 'x' : 'o';
      return true;
    }

    return false;
  })

  // Left Cross
  const leftCross = squares[0].value + squares[4].value + squares[8].value;

  if (leftCross === 'xxx' || leftCross === 'ooo') {
    return leftCross === 'xxx' ? 'x' : 'o';
  }

  const rightCross = squares[2].value + squares[4].value + squares[6].value;

  if (rightCross === 'xxx' || rightCross === 'ooo') {
    return rightCross === 'xxx' ? 'x' : 'o';
  }

  return winner;
}