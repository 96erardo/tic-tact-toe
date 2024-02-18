import React, { useState } from 'react';
import { ScreenProps } from '@/shared/types';

export const Options: React.FC<ScreenProps> = (props) => {
  const [isMulti, setIsMulti] = useState(props.config.mode === 'multi');

  const onSave = () => {
    props.setConfig({
      mode: isMulti ? 'multi' : 'single'
    });

    props.router.goBack();
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-around' }}>
      <div>
        <h1 style={{ textAlign: 'center' }}>Options</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div>
          <input 
            id="mode" 
            type="checkbox" 
            value="false" 
            checked={isMulti}
            onChange={() => setIsMulti(prev => !prev)}
            style={{ marginRight: '12px' }}
          />
          <label htmlFor="mode">
            Multiplayer
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <button onClick={props.router.goBack}>
          Back
        </button>
        <button onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  );
}