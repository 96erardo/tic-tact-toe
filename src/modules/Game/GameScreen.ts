import { Router } from '@/shared/Router';
import { RouteNames } from '@/shared/types';
import { CanvasScreen } from '@/shared/types/CanvasScreen';
import { Pointer } from '@/shared/types/Pointer';
import { display } from './display';
import { State, newGame, GameStatus } from './state';
import { getGameWinner } from './utils';

export class GameScreen extends CanvasScreen {
  router: Router<RouteNames>;
  screen: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  state: State;
  pointer: Pointer;
  keys: Set<string>;
  running: boolean;
  lastTime: number;

  constructor (router: Router<RouteNames>) {
    super(router);

    this.state = newGame()

    this.run = this.run.bind(this);
    this.update = this.update.bind(this);
  }

  start () {
    super.start();

    requestAnimationFrame(this.run)
  }

  run (time: DOMHighResTimeStamp) {
    const delta = this.lastTime ? (time - this.lastTime) / 1000 : 0;
    this.lastTime = time;

    const nextState = this.update(
      delta, 
      this.state
    );
    
    this.pointer.clean()

    display(this.ctx,  nextState);

    this.state = nextState;

    if (this.running) {
      requestAnimationFrame(this.run)
    }
  }

  update (dt: number, state: State): State {
    if (state.status === 'finished') {
      return state;
    }

    let turn = state.turn;
    let winner = null;
    let status: GameStatus = 'playing';
    const squares = state.squares.map(s => s.update(dt, state, this.keys, this.pointer));
    const isPainting = squares.some(square => square.status === 'painting');
    let isFinished = squares.every(square => square.value !== '');

    if (isPainting) {
      status = 'painting';

    } else if (isFinished) {
      status = 'finished';
    }

    if (state.status === 'painting' && status === 'playing') {
      turn = turn === 'o' ? 'x' : 'o'
      
      winner = getGameWinner(squares);

      if (winner !== null) {
        status = 'finished';
      }
    }

    if (status === 'finished') {
      if (winner === null) {
        console.log('The game end in a draw')
      } else {
        console.log('Game ended in a of', winner, '!!')
      }
    }
    
    return {
      turn,
      winner,
      squares,
      status,
    };
  }
}    