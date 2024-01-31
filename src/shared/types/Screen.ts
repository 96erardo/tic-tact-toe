import { Router } from '../Router';

export interface ScreenConstructor<R extends string> {
  new (router: Router<R>): ScreenInterface<R>
}

export interface ScreenInterface<R extends string>  {
  router: Router<R>;
  
  start (): void

  resume (): void
  
  onShown (): void

  onHide (): void

  onRemoved (): void

  /**
   * Moves the screen horizontally (used for routing transitions)
   * 
   * @param position - Number between -1 and 1 
   */
  move (position: number): void
}