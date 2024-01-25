import { Router } from '../../shared/Router';
import { ScreenConstructor, ScreenInterface } from '../../shared/types/Screen';
import { RouteNames } from '../../shared/types/index';

export const TitleScreen: ScreenConstructor<RouteNames> =  class TitleScreen implements ScreenInterface<RouteNames> {
  router: Router<RouteNames>;
  id: number;

  constructor (router: Router<RouteNames>) {
    this.router = router;
  }

  start = () => {
    this.id = window.setInterval(() => {
      console.log('Title')
    }, 1000)

    document.addEventListener('keypress', this.onKey)
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