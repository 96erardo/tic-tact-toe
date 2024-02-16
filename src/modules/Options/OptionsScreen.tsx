import React from 'react';
import { Root } from 'react-dom/client';
import { Router } from '@/shared/Router';
import { RouteNames, GameConfig } from '@/shared/types';
import { HTMLScreen } from '@/shared/types/HTMLScreen';
import { Options } from './Options';

export class OptionsScreen extends HTMLScreen {
  router: Router<RouteNames>;
  screen: HTMLDivElement;
  root: Root;
  config: GameConfig;
  
  start () {
    this.root.render(
      <Options 
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
      <Options 
        router={this.router}
        config={this.config}
        setConfig={this.router.setConfig}
      />
    )
  }
}
