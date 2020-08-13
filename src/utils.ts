import { FlipElementBoundsType } from './types';

export const getBounds = (flipNode: HTMLElement, flipperNode: HTMLElement): FlipElementBoundsType => {
  let el = flipNode;
  let offsetLeft = 0;
  let offsetTop = 0;
  let offsetHeight = el.offsetHeight;
  let offsetWidth = el.offsetWidth;

  while (el && el !== flipperNode) {
    offsetLeft += el.offsetLeft;
    offsetTop += el.offsetTop;
    el = el.offsetParent as HTMLElement;
  }
  // if (!el) {
  //   return;
  // }
  return {
    offsetLeft,
    offsetTop,
    offsetHeight,
    offsetWidth,
  }
}
