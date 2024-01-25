import { ScreenInterface, ScreenConstructor } from './types/Screen';

export class Router <R extends string> {
  running: ScreenInterface<R>;
  stack: Array<ScreenInterface<R>>;
  screens: Array<RouterScreenConfig<R>>
  
  constructor(screens: Array<RouterScreenConfig<R>>) {
    this.screens = screens;    
    
    const Screen = screens.find(options => options.entry)?.screen || screens[0]?.screen;

    this.running = new Screen(this);

    this.stack = [];
  }

  start () {
    this.running.start()
  }

  goTo (screen: R) {
    this.running.onHide();

    this.stack.push(this.running);

    const Screen = this.screens.find(options => options.name === screen).screen;

    this.running = new Screen(this);

    this.running.start()
  }

  goBack () {
    this.running.onRemoved();

    this.running = this.stack.pop();

    this.running.resume();
  }
}

export type RouterScreenConfig<T extends string> = {
  name: T,
  screen: ScreenConstructor<T>,
  entry?: boolean
}