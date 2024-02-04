import { Router } from '@/shared/Router';
import { RouteNames } from '@/shared/types';
import { CanvasScreen } from '@/shared/types/CanvasScreen';
import { Pointer } from '@/shared/types/Pointer';
import { display } from './display';
import { State, newGame } from './state';

export class GameScreen extends CanvasScreen {
  router: Router<RouteNames>;
  screen: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  state: State;
  pointer: Pointer;
  keys: Set<string>;
  running: boolean;

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

  run (time: DOMHighResTimeStamp, lastTime: number = 0, passed: number = 0) {
    const delta = lastTime ? (time - lastTime) / 1000 : 0;

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
    const squares = state.squares.map(s => s.update(dt, state, this.keys, this.pointer));
    let turn = state.turn;

    if (this.pointer.clicked()) {
      console.log('pointer', this.pointer);
      turn = turn === 'o' ? 'x' : 'o'
    }
    
    return {
      ...state,
      turn,
      winner: null,
      squares,
    };
  }
}    