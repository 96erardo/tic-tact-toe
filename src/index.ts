import { Router } from './shared/Router';
import { TitleScreen } from './modules/Title/TitleScreen';
import { OptionsScreen } from './modules/Options/OptionsScreen';
import { RouteNames } from './shared/types/index';

const router = new Router<RouteNames>([
  {
    name: 'title',
    screen: TitleScreen,
    entry: true,
  },
  {
    name: 'options',
    screen: OptionsScreen,
  }
]);

router.start()