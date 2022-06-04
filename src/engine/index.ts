import { Application, Graphics } from 'pixi.js';
import React from 'react';

const colorToInt = (color: string) => parseInt(color.replace('#', '0x'));

export const drawCanvas = (
  setApp: React.Dispatch<React.SetStateAction<Application>>,
) => {
  const _drawCanvas = (
    height: number,
    width: number,
    color = '#000000',
    update: (delta: number) => void,
  ) => {
    console.log('drawing canvas');
    setApp((previousApp) => {
      console.log('previousApp', previousApp);
      if (window.appLoading) {
        return previousApp;
      }
      if (previousApp) {
        try {
          previousApp.destroy();
        } catch (e) {
          console.warn(e);
        }
      }
      window.appLoading = true;
      const app = new Application({
        width,
        height,
        backgroundColor: colorToInt(color),
      });
      app.ticker.add(update);
      app.ticker.maxFPS = 60;
      console.log('app', app);
      window.appLoading = false;
      return app;
    });
  };
  return _drawCanvas;
};

export const drawCircle = (
  setApp: React.Dispatch<React.SetStateAction<Application>>,
) => {
  const _drawCircle = (x: number, y: number, r: number, color: string) => {
    const graphics = new Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(colorToInt(color), 1);
    graphics.drawCircle(x, y, r);
    graphics.endFill();
    setApp((app) => {
      app.stage.addChild(graphics);
      return app;
    });
    return graphics;
  };
  return _drawCircle;
};

export const loadFunctions = (
  setApp: React.Dispatch<React.SetStateAction<Application>>,
) => {
  window.drawCanvas = drawCanvas(setApp);
  window.drawCircle = drawCircle(setApp);
};
