import { ScreenConstructor, ScreenInterface } from './Screen';
import { Router } from '../Router';
import { RouteNames } from './index';

export const CanvasScreen: ScreenConstructor<RouteNames> =  class CanvasScreen implements ScreenInterface<RouteNames> {
  router: Router<RouteNames>;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  id: number;

  constructor (router: Router<RouteNames>) {
    this.router = router;
    this.canvas = document.getElementById('draw') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  start = () => {
    // Entering animation
    let lastTime = 0;
    let passed = 0;

    this.id = requestAnimationFrame(function (time: DOMHighResTimeStamp) {
      const delta = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;
      passed += delta;

      const opacity = Math.max(1, (passed * 1) / 5)

      this.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      this.ctx.fillRect(0, 0, 480, 480)

      if (passed < 5) {
        this.id = requestAnimationFrame(this)
      }
    })
  }

  resume = () => {
    
  }
  
  onShown = () => {
    
  }

  onHide = () => {
  
  }

  onRemoved = () => {
    
  }
}