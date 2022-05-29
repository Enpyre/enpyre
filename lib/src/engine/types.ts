export type CanvasProps = {
    height: number;
    width: number;
    backgroundColor: number;
}

export type DrawCanvas = (
    height: number,
    width: number,
    color: string,
    update: (delta: number) => void
) => void

export type DrawCircle = (
    x: number,
    y: number,
    r: number,
    color: string
) => void
