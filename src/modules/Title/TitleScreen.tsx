import React from 'react';
import { Router } from '../../shared/Router';
import { createRoot, Root } from 'react-dom/client';
import { RouteNames } from '../../shared/types/index';
import { HTMLScreen, In } from '../../shared/types/HTMLScreen';
import { Title } from './Title';

export class TitleScreen extends HTMLScreen {
  router: Router<RouteNames>;
  root: HTMLDivElement;
  node: Root;
  
  start () {
    super.start();

    this.node = createRoot(this.root)

    this.node.render(
      <In>
        <Title router={this.router} />
      </In>
    )
  }

  onHide = () => {
    console.log('hide')
    this.node.unmount();
    super.onHide()
  }
}