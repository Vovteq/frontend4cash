export default class InputHandler {
  public static getMouseScroll(axis: string) {
    return axis === 'x' ? window.scrollX : window.scrollY;
  }
}
