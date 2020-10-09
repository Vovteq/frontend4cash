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
    DOMEventHandler.addOnLoad(() => {
      this.move()
    });
    DOMEventHandler.addOnScroll(() => {
      this.move()
    });
  }

  private move() {
    this.target.style.transform = "translateY(" + (InputHandler.getMouseScroll('y') * this.ctx.speed + this.ctx.offset) + "px)";
  }

  public setContext(context: ParallaxContext): void {
    this.ctx = context;
  }
}
