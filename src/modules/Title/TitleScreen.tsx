import React from 'react';
import { Router } from '@/shared/Router';
import { Root } from 'react-dom/client';
import { RouteNames, GameConfig } from '@/shared/types';
import { HTMLScreen } from '@/shared/types/HTMLScreen';
import { Title } from './Title';

export class TitleScreen extends HTMLScreen {
  router: Router<RouteNames>;
  screen: HTMLDivElement;
  root: Root;
  config: GameConfig;
  
  start () {
    this.root.render(
      <Title 
        router={this.router}
        config={this.config}
        setConfig={this.router.setConfig}
      />
    )
    
    super.start();
  }

  refresh (config: GameConfig) {
    this.config = config;

    this.root.render(
      <Title 
        router={this.router}
        config={this.config}
        setConfig={this.router.setConfig}
      />
    )
  }
}