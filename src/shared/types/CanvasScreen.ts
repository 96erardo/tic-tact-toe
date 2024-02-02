import { ScreenConstructor, ScreenInterface } from './Screen';
import { Router } from '../Router';
import { RouteNames } from './index';
import { container } from '../constants';

export const CanvasScreen: ScreenConstructor<RouteNames> =  class CanvasScreen implements ScreenInterface<RouteNames> {
  router: Router<RouteNames>;
  screen: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pointer: { x: number, y: number };
  keys: Set<string>;
  running: boolean;

  constructor (router: Router<RouteNames>) {
    this.router = router;
    this.screen = document.createElement('canvas') as HTMLCanvasElement;
    this.screen.setAttribute('width', '480px');
    this.screen.setAttribute('height', '480px');
    
    this.ctx = this.screen.getContext('2d');
    this.keys = new Set();
    this.running = false;
    
    this.screen.className = 'screen off';

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  
  start () {
    container.appendChild(this.screen);

    requestAnimationFrame(() => {
      this.screen.className = 'screen on';
    })

    this.screen.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  resume () {
    this.screen.className = 'screen on';

    this.screen.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  onClick (e: PointerEvent) {
    this.pointer = { x: e.offsetX, y: e.offsetY }
  }

  onKeyDown (e: KeyboardEvent) {
    this.keys.add(e.code)
  }

  onKeyUp (e: KeyboardEvent) {
    this.keys.delete(e.code);

    if (e.code === 'Backspace') {
      this.router.goBack()
    }
  }
  
  onShown () {

  }

  onHide () {
    this.screen.className = 'screen hidden';

    this.screen.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    this.keys.clear();
  }

  onRemoved () {
    this.running = false;

    this.screen.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);

    this.keys.clear();

    document.addEventListener('transitionend', () => {
      this.screen.remove();
    }, { once: true })

    this.screen.className = 'screen off'
  }
}