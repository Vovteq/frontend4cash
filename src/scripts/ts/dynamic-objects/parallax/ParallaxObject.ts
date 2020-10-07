import DOMEventHandler from "../../utils/DOMEventHandler";
import InputHandler from "../../utils/InputHandler";
import ParallaxContext from "./ParallaxContext";
import DynamicObject from "../DynamicObject";

export default class ParallaxObject extends DynamicObject {
  private ctx: ParallaxContext;

  constructor(target: HTMLElement, context: ParallaxContext) {
    super(target);
    this.setContext(context);
    if (target === undefined) return;
    this.applyDynamics();
  }

  public applyDynamics(): void {
    DOMEventHandler.addOnScroll(() => {
      const scroll = InputHandler.getMouseScroll('y');
      this.target.style.transform = "translate3d(0," + scroll * this.ctx.speed + "px, 0)";
    });
  }

  public setContext(context: ParallaxContext): void {
    this.ctx = context;
  }
}
