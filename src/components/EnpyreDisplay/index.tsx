import React, { useEffect } from 'react';

import { keyEvent } from '../../engine/events';
import { useApp } from '../../hooks/App';
import { usePyodide } from '../../hooks/Pyodide';

const EnpyreDisplay: React.FC = () => {
  const { app } = useApp();
  const { pyodideLoaded } = usePyodide();

  useEffect(() => {
    console.log('EnpyreDisplay: app', app);
    if (app) {
      const canvasDiv: HTMLElement =
        document.getElementById('canvas-container');
      canvasDiv.innerHTML = '';
      canvasDiv.appendChild(app.view);
      document.addEventListener('keydown', keyEvent, false);
      document.addEventListener('keyup', keyEvent, false);
    }
  }, [app]);

  console.log('EnpyreDisplay: pyodideLoaded', pyodideLoaded);

  return (
    <div>
      {pyodideLoaded ? (
        <div
          id="canvas-container"
          onMouseEnter={() => {
            window.canvasFocused = true;
          }}
          onMouseLeave={() => {
            window.canvasFocused = false;
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EnpyreDisplay;
