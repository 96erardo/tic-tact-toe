import { ScreenConstructor, ScreenInterface } from './Screen';
import { Router } from '../Router';
import { RouteNames } from './index';
import { container } from '../constants';

export const CanvasScreen: ScreenConstructor<RouteNames> =  class CanvasScreen implements ScreenInterface<RouteNames> {
  router: Router<RouteNames>;
  screen: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  running: boolean;

  constructor (router: Router<RouteNames>) {
    this.router = router;
    this.screen = document.createElement('canvas') as HTMLCanvasElement;
    this.ctx = this.screen.getContext('2d');
    this.running = false;
    
    this.screen.className = 'drawn off';
  }
  
  start () {
    container.appendChild(this.screen);

    requestAnimationFrame(() => {
      this.screen.className = 'drawn on';
    })
  }

  resume = () => {
    this.screen.className = 'drawn on';
  }
  
  onShown = () => {

  }

  onHide = () => {
    this.screen.className = 'drawn hidden';
  }

  onRemoved = () => {
    this.running = false;

    this.screen.addEventListener('transitionend', () => {
      console.log('remove')
      this.screen.remove();
    }, { once: true })

    this.screen.className = 'drawn off'
  }
}