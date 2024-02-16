import { Router } from '@/shared/Router';

export type GameConfig = {
  mode: 'single' | 'multi'
}

export type RouteNames = 'title' |
  'options' |
  'game'
;

export type ScreenProps = {
  router: Router<RouteNames>,
  config: GameConfig,
  setConfig: (config: Partial<GameConfig>) => void
}