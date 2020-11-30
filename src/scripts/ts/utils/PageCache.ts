import {Delegate} from "../delegates/Delegate";
import {Dictionary} from "../data-handling/Dictionary";
import {ContextButtonComponent} from "../../../app/buttons/context-button/context-button.component";
import {ComponentRef, ElementRef} from "@angular/core";

export default class PageCache {
  public contexts: Dictionary<ElementRef, () => void>;

  public onContextInvoked: Delegate<[ContextButtonComponent]> = new Delegate<[ContextButtonComponent]>();

  public constructor() {
    this.contexts = new Dictionary<ElementRef, () => void>();
  }

  public register(element: ElementRef, func: () => void) {
    this.contexts.addPair(element, func);
  }

  public resolve() {
    for (let ctx of this.contexts) {
      ctx.value.call(null);
      this.onContextInvoked.invoke(null);
    }
  }
}
