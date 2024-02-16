import { Router } from '../Router';
import { GameConfig } from './index';

export interface ScreenConstructor<R extends string> {
  new (router: Router<R>): ScreenInterface<R>
}

export interface ScreenInterface<R extends string>  {
  router: Router<R>;
  
  start (): void

  resume (): void

  refresh (config: GameConfig): void
  
  onShown (): void

  onHide (): void

  onRemoved (): void
}