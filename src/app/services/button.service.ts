import { Injectable } from '@angular/core';

@Injectable()
export class ButtonService {

  constructor() { }

  public showModal(windowId: string): void {
    //TODO: Show modal using bootstrap
    console.log("Showing modal: " + windowId);
  }

  public scrollTo(elemId: string): void {

  }
}
