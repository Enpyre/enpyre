from . import js_interface


class Core:
    def key_pressed(self, key):
        return js_interface.keyPressed(key)
