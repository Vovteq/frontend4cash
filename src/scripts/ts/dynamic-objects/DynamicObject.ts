import Bindable from "../interfaces/Bindable";

export default abstract class DynamicObject implements Bindable {
  protected target: HTMLElement;

  protected constructor(target: HTMLElement) {
    this.bind(target);
  }

  public bind(elem: HTMLElement): void {
    this.target = elem;
  }

  public abstract applyDynamics(): void;
}
