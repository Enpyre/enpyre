let canvasFocused = false;

const keyEvent = (event: any) => {
    if (!canvasFocused) return;

    if (!['keyup', 'keydown'].includes(event.type)) return;

    event.preventDefault();

    var code = event.code;
    (window as any)[code] = event.type == 'keyup' ? false : true;
};

document.addEventListener('keydown', keyEvent, false);
document.addEventListener('keyup', keyEvent, false);

var canvas = document.getElementById("canvas-container");

canvas?.addEventListener("focus", () => {
    canvasFocused = true;
});

canvas?.addEventListener("blur", () => {
    canvasFocused = false;
});
