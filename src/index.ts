import { Router } from './shared/Router';
import { TitleScreen } from './modules/Title/TitleScreen';
import { OptionsScreen } from './modules/Options/OptionsScreen';
import { GameScreen } from './modules/Game/GameScreen';
import { RouteNames } from './shared/types/index';
import './index.css';

const router = new Router<RouteNames>([
  {
    name: 'title',
    screen: TitleScreen,
    entry: true,
  },
  {
    name: 'options',
    screen: OptionsScreen,
  },
  {
    name: 'game',
    screen: GameScreen
  }
]);

router.start()