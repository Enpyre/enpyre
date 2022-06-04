import { DrawCanvas, DrawCircle } from '../engine/types';

type CurrentWindow = Window & typeof globalThis;

declare global {
  interface Window extends CurrentWindow {
    loadPyodide: () => Promise<any>;
    pyodideAlreadyLoading: boolean;
    functionsLoaded: boolean;
    appLoading: boolean;
    enpyrePackageLoaded: boolean;
    canvasFocused: boolean;
    drawCanvas: DrawCanvas;
    drawCircle: DrawCircle;
  }
}

export {};
