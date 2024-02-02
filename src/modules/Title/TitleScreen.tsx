import React from 'react';
import { Router } from '../../shared/Router';
import { Root } from 'react-dom/client';
import { RouteNames } from '../../shared/types/index';
import { HTMLScreen } from '../../shared/types/HTMLScreen';
import { Title } from './Title';

export class TitleScreen extends HTMLScreen {
  router: Router<RouteNames>;
  screen: HTMLDivElement;
  root: Root;
  
  start () {
    this.root.render(
      <Title router={this.router} />
    )
    
    super.start();
  }
}