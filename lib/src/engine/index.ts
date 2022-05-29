import { Application, Graphics } from "pixi.js";

export const loadFunctions = (
  setApp: React.Dispatch<React.SetStateAction<Application>>
) => {
    const colorToInt = (color: string) => {
      return parseInt(color.replace("#", "0x"));
    };

    const drawCanvas = (
      height: number,
      width: number,
      color: string = '#000000',
      update: (delta: number) => void,
    ) => {
      console.log("drawing canvas");
        setApp(previousApp => {
          console.log('previousApp', previousApp);
          if (previousApp) {
            previousApp.destroy()
          }
          const app = new Application(
            {
              width,
              height,
              backgroundColor: colorToInt(color)
            }
          );
          const canvasDiv: any = document.getElementById("canvas-container");
          canvasDiv.innerHTML = '';
          canvasDiv.appendChild(app.view);
          app.ticker.add(update);
          app.ticker.maxFPS = 60;
          console.log('app', app);
          return app
        })
    }

    const drawCircle = (x: number, y: number, r: number, color: string) => {
      setApp(app => {
        const graphics = new Graphics()
        graphics.lineStyle(0);
        graphics.beginFill(colorToInt(color), 1);
        graphics.drawCircle(x, y, r);
        graphics.endFill();
        app.stage.addChild(graphics);
        return app;
      })
    }
    window.drawCanvas = drawCanvas;
    window.drawCircle = drawCircle;
}
