type Delegate = () => void;

export default class DOMEventHandler {
  public static addOnLoad(func: Delegate) {
    window.addEventListener('load', func, false);
  }

  public static addOnScroll(func: Delegate) {
    window.addEventListener('scroll', func, false)
  }
}
