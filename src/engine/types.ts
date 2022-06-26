import { Graphics, Sprite } from 'pixi.js';

export type CanvasProps = {
  height: number;
  width: number;
  backgroundColor: number;
};

export type DrawCanvas = (
  height: number,
  width: number,
  color: string,
  update: (delta: number) => void,
) => void;

export type DrawCircle = (
  x: number,
  y: number,
  r: number,
  color: string,
) => Graphics;

export type AddSong = (
  alias: string,
  url: string,
  playOnLoad?: boolean,
) => void;

export type PlaySong = (alias: string) => void;

export type StopSong = (alias?: string) => void;

export type AddSprite = (imageUrl: string) => Sprite;
