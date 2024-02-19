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

  // Right Cross
  const rightCross = squares[2].value + squares[4].value + squares[6].value;

  if (rightCross === 'xxx' || rightCross === 'ooo') {
    return rightCross === 'xxx' ? 'x' : 'o';
  }

  return winner;
}

export function getSelectedSquare (squares: Array<Square>): Square {
  // 1. Look for a winnig opportunity 
  const win = getWinningSquareFrom(squares, 'o');

  if (win) {
    return win;
  }
  
  // 2. Look for the rival's winning opportunity
  const block = getWinningSquareFrom(squares, 'x');

  if (block) {
    return block;
  }

  // 3. Randomly generate selected square
  const empty = squares.filter(s => s.value === '')
  const selected = empty[Math.round(Math.random() * (empty.length - 1))]

  return selected;
}

export function getWinningSquareFrom (squares: Array<Square>, value: 'x' | 'o'): Square | null {
  const rival = value === 'o' ? 'x' : 'o';

  for (let i = 0; i < 3; i++) {
    const row = squares.slice(i * 3, i * 3 + 3)
    const r = row.reduce((acum, s) => acum + (s.value === '' ? ' ' : s.value), '');

    // Looking for a row with two "o" and one blank space
    if (r.indexOf(rival) === - 1) {
      const match = r.match(/ /g);

      if (match && match.length === 1) {
        return row[r.indexOf(' ')]
      }
    }

    const column = [squares[i], squares[i + 3], squares[i + 6]];
    const c = column.reduce((acum, s) => acum + (s.value === '' ? ' ' : s.value), '');
    
    // Looking for a column with two "o" and one blank space
    if (c.indexOf(rival) === - 1) {
      const match = c.match(/ /g);

      if (match && match.length === 1) {
        return column[c.indexOf(' ')]
      }
    }
  }

  // Left Cross
  const leftCross = squares[0].value + squares[4].value + squares[8].value;
  
  if (leftCross.indexOf(rival) === - 1) {
    const match = leftCross.match(/ /g);

    if (match && match.length === 1) {
      return squares[leftCross.indexOf(' ') * 4]
    }
  }

  // Right Cross
  const rightCross = squares[2].value + squares[4].value + squares[6].value;
  
  if (rightCross.indexOf(rival) === - 1) {
    const match = rightCross.match(/ /g);

    if (match && match.length === 1) {
      return squares[rightCross.indexOf(' ') * 2 + 2]
    }
  }
}