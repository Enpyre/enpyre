import React from 'react';
import { PyongineProvider, useApp, PyongineContainer } from '.';
import { drawCanvas, drawCircle } from './engine';

const Preview: React.FC = () => {
    const { setApp } = useApp();
    return (
      <>
        <PyongineContainer />
        <button onClick={() => {
          console.log('window.drawCanvas', window.drawCanvas)
          drawCanvas(setApp)(300, 300, '#111111', (delta) => {});
          drawCircle(setApp)(100, 100, 50, '#ffffff');
        }}>Render</button>
      </>
    )
}

const App: React.FC = () => {
  return (
    <PyongineProvider>
      <Preview />
    </PyongineProvider>
  );
}

export default App;
