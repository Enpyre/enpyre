from src.engine import pyongine


def update(time: float):
    x = y = time%800
    if not hasattr(pyongine, 'circle'):
        pyongine.circle = pyongine.draw_circle(x, y, 100, '#ffffff')
    else:
        pyongine.circle.x = x
        pyongine.circle.y = y

pyongine.run(800, 800, '#000000', update)
