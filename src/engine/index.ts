import { sound } from '@pixi/sound';
import { Application, Graphics, Sprite } from 'pixi.js';
import React from 'react';

const colorToInt = (color: string) => parseInt(color.replace('#', '0x'));

export const drawCanvas = (
  setApp: React.Dispatch<React.SetStateAction<Application | undefined>>,
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
  setApp: React.Dispatch<React.SetStateAction<Application | undefined>>,
) => {
  const _drawCircle = (x: number, y: number, r: number, color: string) => {
    const graphics = new Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(colorToInt(color), 1);
    graphics.drawCircle(x, y, r);
    graphics.endFill();
    setApp((app) => {
      if (app) {
        app.stage.addChild(graphics);
      }
      return app;
    });
    return graphics;
  };
  return _drawCircle;
};

export const addSong = (alias: string, url: string, playOnLoad = false) => {
  const loadSound = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    sound.add(alias, arrayBuffer);
    if (playOnLoad) {
      sound.play(alias);
    }
  };
  loadSound(url);
};

export const playSong = (alias: string) => {
  sound.play(alias);
};

export const stopSong = (alias?: string) => {
  if (alias) {
    sound.stop(alias);
  } else {
    sound.stopAll();
  }
};

export const addSprite = (
  setApp: React.Dispatch<React.SetStateAction<Application | undefined>>,
) => {
  const _addSprite = (imageUrl: string) => {
    const sprite = Sprite.from(imageUrl);
    setApp((app) => {
      if (app) {
        app.stage.addChild(sprite);
      }
      return app;
    });
    return sprite;
  };
  return _addSprite;
};

export const loadFunctions = (
  setApp: React.Dispatch<React.SetStateAction<Application | undefined>>,
) => {
  window.drawCanvas = drawCanvas(setApp);
  window.drawCircle = drawCircle(setApp);
  window.addSong = addSong;
  window.playSong = playSong;
  window.stopSong = stopSong;
  window.addSprite = addSprite(setApp);
};
