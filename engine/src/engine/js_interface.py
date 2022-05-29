from typing import Callable


def drawCanvas(
    height: int,
    width: int,
    color: str,
    callback: Callable[[float], None]
):
    import js
    js.drawCanvas(height, width, color, callback)


def drawCircle(x: int, y: int, r: int, color: str):
    import js
    return js.drawCircle(x, y, r, color)


def keyPressed(key: str) -> bool:
    import js
    try:
        attr = getattr(js, key)
        return bool(attr)
    except AttributeError:
        return False
