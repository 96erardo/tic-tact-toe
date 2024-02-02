import { ScreenConstructor, ScreenInterface } from './Screen';
import { Root, createRoot } from 'react-dom/client';
import { Router } from '../Router';
import { RouteNames } from './index';
import { container } from '../constants';

export const HTMLScreen: ScreenConstructor<RouteNames> =  class HTMLScreen implements ScreenInterface<RouteNames> {
  router: Router<RouteNames>;
  screen: HTMLDivElement;
  root: Root;

  constructor (router: Router<RouteNames>) {
    this.router = router;
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