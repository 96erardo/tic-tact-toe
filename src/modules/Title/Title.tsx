import React from 'react';
import { ScreenProps } from '@/shared/types';

export const Title: React.FC<ScreenProps> = (props) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-around' }}>
      <div>
        <h1 style={{ textAlign: 'center' }}>Tic Tac Toe</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => props.router.goTo('game')}>
          Start Game
        </button>
        <br />
        <br />
        <button onClick={() => props.router.goTo('options')}>
          Options
        </button>
      </div>
      <div>
        <p style={{ textAlign: 'center' }}>Create By 6erardo</p>
      </div>
    </div>
  )
}