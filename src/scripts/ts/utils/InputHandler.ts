export default class InputHandler {
  private constructor() { }

  public static getMouseScroll(axis: string) {
    return axis === 'x' ? window.scrollX : window.scrollY;
  }
}
