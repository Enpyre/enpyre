import {
  AddSong,
  DrawCanvas,
  DrawCircle,
  PlaySong,
  StopSong,
} from '../engine/types';
import { Pyodide } from './pyodide';

type CurrentWindow = Window & typeof globalThis;

declare global {
  interface Window extends CurrentWindow {
    loadPyodide?: () => Promise<Pyodide>;
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
  }
}

export {};
