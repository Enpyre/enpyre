import os
import aiohttp_cors
from aiohttp import web

app = web.Application()

cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
})

cors.add(app.router.add_static('/', './dist', show_index=True))

def main():
    os.system('python3 -m build')
    web.run_app(app)
