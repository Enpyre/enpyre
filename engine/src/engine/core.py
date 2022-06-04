from typing import Callable
from . import js_interface


class Core:
    __jsupdate = None

    def key_pressed(self, key):
        return js_interface.keyPressed(key)

    def __update(self, delta: float):
        if self.__update is not None:
            self.time += delta
            self.frame += 1
            self.__jsupdate(delta)

    def get_update(self, jsupdate: Callable[[float], None]):
        self.__jsupdate = jsupdate
        return js_interface.create_proxy(self.__update)
