from src.engine import Pyongine

pyongine = Pyongine()

pyongine.x = pyongine.y = START_X = START_Y = 0
BOARD_WIDTH = BOARD_HEIGHT = 600

def fill_cell(x, y, color='#000000'):
    return pyongine.draw_circle(x*100 + 50, y*100 + 50, 50, color)

def start_board():
    pyongine.board = [
        [
            fill_cell(x, y) for x in range(BOARD_WIDTH//100)
        ] for y in range(BOARD_HEIGHT//100)
    ]

def move(x, y):
    print(f'Moving to {x}, {y}')
    print(f'Current position: {pyongine.x}, {pyongine.y}')
    fill_cell(pyongine.x, pyongine.y, '#FFFFFF')
    fill_cell(x, y, '#FF0000')
    pyongine.x = x
    pyongine.y = y

def compute_key():
    if pyongine.key_pressed(pyongine.KEY_UP):
        if pyongine.y > 0:
            move(pyongine.x, pyongine.y - 1)
    if pyongine.key_pressed(pyongine.KEY_DOWN):
        if pyongine.y < BOARD_HEIGHT//100 - 1:
            move(pyongine.x, pyongine.y + 1)
    if pyongine.key_pressed(pyongine.KEY_LEFT):
        if pyongine.x > 0:
            move(pyongine.x - 1, pyongine.y)
    if pyongine.key_pressed(pyongine.KEY_RIGHT):
        if pyongine.x < BOARD_WIDTH//100 - 1:
            move(pyongine.x + 1, pyongine.y)


def update(time: float):
    if not hasattr(pyongine, 'board'):
        start_board()
        move(START_X, START_Y)
    else:
        compute_key()

pyongine.run(BOARD_HEIGHT, BOARD_WIDTH, '#ffffff', update)
