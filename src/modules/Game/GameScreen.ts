import { Router } from '../../shared/Router';
import { RouteNames } from '../../shared/types/index';
import { CanvasScreen } from '../../shared/types/CanvasScreen';

export class GameScreen extends CanvasScreen {
  router: Router<RouteNames>;
  screen: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  running: boolean;

  start () {
    super.start();

    document.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        this.router.goBack()
      }
    }, { once: true })
  }
}    