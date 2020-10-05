import 'apexcharts';
import Bindable from "../interfaces/Bindable";

// Basic class for all graphs.
export default abstract class Graph implements Bindable {
  protected targetGraphics: HTMLElement;

  protected constructor(targetGraphics: HTMLElement) {
    this.bind(targetGraphics);
  }

  abstract render(): void;

  bind(elem: HTMLElement) {
    this.targetGraphics = elem;
  }
}
