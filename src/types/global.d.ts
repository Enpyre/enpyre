import {
  AddSong,
  AddSprite,
  DrawCanvas,
  DrawCircle,
  PlaySong,
  StopSong,
} from '../engine/types';
import { Pyodide } from './pyodide';

type CurrentWindow = Window & typeof globalThis;

type PyodideOptions = {
  stdout: (msg: string) => void;
  stderr: (msg: string) => void;
};

declare global {
  interface Window extends CurrentWindow {
    loadPyodide?: (options?: PyodideOptions) => Promise<Pyodide>;
    pyodideAlreadyLoading?: boolean;
    functionsLoaded?: boolean;
    appLoading?: boolean;
    enpyrePackageLoaded?: boolean;
    canvasFocused?: boolean;
    drawCanvas?: DrawCanvas;
    drawCircle?: DrawCircle;
    addSong?: AddSong;
    playSong?: PlaySong;
    stopSong?: StopSong;
    addSprite?: AddSprite;
  }
}

export {};
