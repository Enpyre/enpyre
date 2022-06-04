from engine import Enpyre

enpyre = Enpyre()

def update(delta: float):
    SPEED = 3
    if not hasattr(enpyre, 'circle'):
        enpyre.circle = enpyre.draw_circle(100, 100, 100, '#ffffff')
    else:
        if enpyre.key_pressed(enpyre.KEY_UP):
            enpyre.circle.y -= SPEED
        if enpyre.key_pressed(enpyre.KEY_DOWN):
            enpyre.circle.y += SPEED
        if enpyre.key_pressed(enpyre.KEY_LEFT):
            enpyre.circle.x -= SPEED
        if enpyre.key_pressed(enpyre.KEY_RIGHT):
            enpyre.circle.x += SPEED

enpyre.run(400, 400, '#000000', update)
