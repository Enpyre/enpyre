export const keyEvent = (event: any) => {
  if (!window.canvasFocused) return;
  if (!['keyup', 'keydown'].includes(event.type)) return;

  event.preventDefault();

  const { code } = event;
  (window as any)[code] = event.type != 'keyup';
};
