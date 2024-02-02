import { Router } from '../../shared/Router';
import { RouteNames } from '../../shared/types/index';
import { CanvasScreen } from '../../shared/types/CanvasScreen';
import { display } from './display';

export class GameScreen extends CanvasScreen {
  router: Router<RouteNames>;
  screen: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pointer: { x: number, y: number };
  keys: Set<string>;
  running: boolean;

  start () {
    const g = this;
    super.start();

    requestAnimationFrame(function draw () {
      display(g.ctx)

      if (g.running) {
        requestAnimationFrame(draw);
      }
    })
  }
}    