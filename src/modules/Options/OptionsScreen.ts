import { Router } from '../../shared/Router';
import { ScreenConstructor, ScreenInterface } from '../../shared/types/Screen';
import { RouteNames } from '../../shared/types/index';

export const OptionsScreen: ScreenConstructor<RouteNames> =  class OptionsScreen implements ScreenInterface<RouteNames> {
  router: Router<RouteNames>;
  id: number;

  constructor (router: Router<RouteNames>) {
    this.router = router;
  }

  start () {
    this.id = window.setInterval(() => {
      console.log('Options')
    }, 1000)

    document.addEventListener('keypress', this.onKey)
  }

  onKey = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      this.router.goBack()
    }
  }

  resume () {
    this.id = window.setInterval(() => {
      console.log('Options')
    }, 1000)

    document.addEventListener('keypress', this.onKey)
  }
  
  onShown () {
    
  }

  onHide () {
    window.clearInterval(this.id)
    document.removeEventListener('keypress', this.onKey)
  }

  onRemoved () {
    window.clearInterval(this.id)
    document.removeEventListener('keypress', this.onKey)
  }

  move (position: number) {
    
  }
}