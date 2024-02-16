import { ScreenInterface, ScreenConstructor } from './types/Screen';
import { GameConfig } from './types';
import { generateGameConfig } from './utils';

export class Router <R extends string> {
  running: ScreenInterface<R>;
  stack: Array<ScreenInterface<R>>;
  screens: Array<RouterScreenConfig<R>>
  config: GameConfig;
  
  constructor(screens: Array<RouterScreenConfig<R>>) {
    this.screens = screens;    
    
    const Screen = screens.find(options => options.entry)?.screen || screens[0]?.screen;

    this.config = generateGameConfig();
    this.running = new Screen(this);
    this.stack = [];

    this.goBack = this.goBack.bind(this)
    this.setConfig = this.setConfig.bind(this)
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
  
  setConfig (newState: Partial<GameConfig>): void {
    this.config = Object.assign({}, this.config, newState)
    
    this.running.refresh(this.config);

    this.stack.forEach(screen => screen.refresh(this.config))
  }
}

export type RouterScreenConfig<T extends string> = {
  name: T,
  screen: ScreenConstructor<T>,
  entry?: boolean
}