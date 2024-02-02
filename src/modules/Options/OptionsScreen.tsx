import React from 'react';
import { Router } from '../../shared/Router';
import { createRoot, Root } from 'react-dom/client';
import { RouteNames } from '../../shared/types/index';
import { HTMLScreen } from '../../shared/types/HTMLScreen';

export class OptionsScreen extends HTMLScreen {
  router: Router<RouteNames>;
  screen: HTMLDivElement;
  root: Root;
  
  start () {
    this.root.render(
      <div>
        <h1>Hello World</h1>
        <button onClick={this.router.goBack}>
          Back
        </button>
      </div>
    )
    
    super.start();
  }
}
