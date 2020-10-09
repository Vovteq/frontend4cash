import { Injectable } from '@angular/core';
import DOMParser from "../../scripts/ts/utils/DOMParser";

@Injectable()
export class ReferenceService {

  constructor() { }

  public findElementByClass(className: string): HTMLElement {
    return DOMParser.findElementByClass(className).item(0) as HTMLElement;
  }
}
