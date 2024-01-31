import { Router } from '../../shared/Router';
import { ScreenConstructor, ScreenInterface } from '../../shared/types/Screen';
import { RouteNames } from '../../shared/types/index';

export const GameScreen: ScreenConstructor<RouteNames> =  class GameScreen implements ScreenInterface<RouteNames> {
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
    let s = this;

    this.id = requestAnimationFrame(function surprise (time: DOMHighResTimeStamp) {
      const delta = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;
      passed += delta;

      const opacity = 1 - Math.min(1, (passed * 1) / 0.5)

      s.ctx.clearRect(0, 0, 480, 480);
      s.ctx.fillStyle = `rgb(0, 0, 0, ${opacity})`;
      s.ctx.fillRect(0, 0, 480, 480);

      if (passed < 0.5) {
        s.id = requestAnimationFrame(surprise)
      }
    })
  }

  onKey = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      this.router.goTo('options')
    }
  }

  resume = () => {
    this.id = window.setInterval(() => {
      console.log('Title')
    }, 1000)

    document.addEventListener('keypress', this.onKey)
  }
  
  onShown = () => {
    
  }

  onHide = () => {
    window.clearInterval(this.id)
    document.removeEventListener('keypress', this.onKey)
  }

  onRemoved = () => {
    window.clearInterval(this.id)
    document.removeEventListener('keypress', this.onKey)
  }
}