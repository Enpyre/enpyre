from engine import Enpyre

enpyre = Enpyre()

enpyre.x = enpyre.y = START_X = START_Y = 0
BOARD_WIDTH = BOARD_HEIGHT = 600

def fill_cell(x, y, color='#000000'):
    return enpyre.draw_circle(x*100 + 50, y*100 + 50, 50, color)

def start_board():
    enpyre.board = [
        [
            fill_cell(x, y) for x in range(BOARD_WIDTH//100)
        ] for y in range(BOARD_HEIGHT//100)
    ]

def move(x, y):
    print(f'Moving to {x}, {y}')
    print(f'Current position: {enpyre.x}, {enpyre.y}')
    fill_cell(enpyre.x, enpyre.y, '#FFFFFF')
    fill_cell(x, y, '#FF0000')
    enpyre.x = x
    enpyre.y = y

def compute_key():
    if enpyre.key_pressed(enpyre.KEY_UP):
        if enpyre.y > 0:
            move(enpyre.x, enpyre.y - 1)
    if enpyre.key_pressed(enpyre.KEY_DOWN):
        if enpyre.y < BOARD_HEIGHT//100 - 1:
            move(enpyre.x, enpyre.y + 1)
    if enpyre.key_pressed(enpyre.KEY_LEFT):
        if enpyre.x > 0:
            move(enpyre.x - 1, enpyre.y)
    if enpyre.key_pressed(enpyre.KEY_RIGHT):
        if enpyre.x < BOARD_WIDTH//100 - 1:
            move(enpyre.x + 1, enpyre.y)


def update(delta: float):
    if not hasattr(enpyre, 'board'):
        start_board()
        move(START_X, START_Y)
    else:
        compute_key()

enpyre.run(BOARD_HEIGHT, BOARD_WIDTH, '#ffffff', update)
