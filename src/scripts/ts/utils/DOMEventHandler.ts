type EmptyDelegate = () => void;

export default class DOMEventHandler {
  private constructor() { }

  public static addOnLoad(func: EmptyDelegate) {
    window.addEventListener('load', func, false);
  }

  public static addOnScroll(func: EmptyDelegate) {
    window.addEventListener('scroll', func, false)
  }
}
