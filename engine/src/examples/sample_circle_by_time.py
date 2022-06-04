from engine import Enpyre

enpyre = Enpyre()

enpyre.time = 0

def update(delta: float):
    enpyre.time += delta
    x = y = enpyre.time%800
    if not hasattr(enpyre, 'circle'):
        enpyre.circle = enpyre.draw_circle(x, y, 100, '#ffffff')
    else:
        enpyre.circle.x = x
        enpyre.circle.y = y

enpyre.run(800, 800, '#000000', update)
