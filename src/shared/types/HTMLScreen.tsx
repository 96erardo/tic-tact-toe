import { ScreenConstructor, ScreenInterface } from './Screen';
import { Root, createRoot } from 'react-dom/client';
import { Router } from '../Router';
import { RouteNames } from './index';
import { container } from '../constants';
import { GameConfig } from './index';

export const HTMLScreen: ScreenConstructor<RouteNames> =  class HTMLScreen implements ScreenInterface<RouteNames> {
  router: Router<RouteNames>;
  screen: HTMLDivElement;
  root: Root;
  config: GameConfig;

  constructor (router: Router<RouteNames>) {
    this.router = router;
    this.config = this.router.config;
    this.screen = document.createElement('div') as HTMLDivElement;
    this.screen.className = 'screen off';
    
    this.root = createRoot(this.screen);
  }
  
  start () {
    container.appendChild(this.screen);

    requestAnimationFrame(() => {
      this.screen.className = 'screen on';
    })
  }

  resume () {
    this.screen.className = 'screen on';
  }

  refresh (config: GameConfig) {
    this.config = config;
  }
  
  onShown = () => {

  }

  onHide () {
    this.screen.className = 'screen hidden';
  }

  onRemoved () {
    this.screen.addEventListener('transitionend', () => {
      this.root.unmount()
      this.screen.remove();
    }, { once: true })

    this.screen.className = 'screen off'
  }
}