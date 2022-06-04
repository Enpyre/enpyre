export const keyEvent = (event: any) => {
    if (!window.canvasFocused) return;
    if (!['keyup', 'keydown'].includes(event.type)) return;

    event.preventDefault();

    var code = event.code;
    (window as any)[code] = event.type == 'keyup' ? false : true;
};
