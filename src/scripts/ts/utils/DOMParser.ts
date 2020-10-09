import DOMController from "./DOMController";
import ParallaxContext from "../dynamic-objects/parallax/ParallaxContext";
import DynamicObjectFactory from "../dynamic-objects/DynamicObjectFactory";

export default class DOMParser {
  private static readonly parseRules: Array<(elem: HTMLElement) => void> = [
    // Parallax effect
    (elem: HTMLElement) => {
      if (elem.classList.contains('parallax-object')) {
        DOMController.addParallaxEffect(elem,
          new ParallaxContext
          (
            (elem.getAttribute("parallax-speed") as unknown as number) || -0.4,
            (elem.getAttribute("parallax-offset") as unknown as number) || -0.4
          )
          );
      }
    }
  ];


  public static findElementByClass(elemClass: string): HTMLCollectionOf<Element> {
    return document.getElementsByClassName(elemClass);
  }


  public static parse(): void {
    console.log("DOMParser started parsing...");
    const time = Date.now();

    const elems = document.querySelectorAll('*');
    for(let elem of Array.from(elems)) {
      for (let rule of this.parseRules) {
        rule(elem as HTMLElement);
      }
    }

    console.log("DOMParser done parsing (" + (Date.now() - time) + " ms).");
  }
}
