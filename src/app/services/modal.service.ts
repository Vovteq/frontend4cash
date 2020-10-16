import { Injectable, OnDestroy } from '@angular/core';
import {ModalComponent} from "../general-components/modal/modal.component";
import ModalInspector from "../../scripts/ts/utils/ModalInspector";

@Injectable()
export class ModalService implements OnDestroy{

  public focusedModal: ModalComponent;

  constructor() { }

  // Custom modal templates. Used by modals to match specific template.
  public modals: {[id: string]: string} = {
    // Register template (standard)
    register: `
      <h2>Register</h2>
      <p>Create new account and start trading now!</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper">
        <input size="40" type="email">
        <span class="bar"></span>
        <label>E-mail</label>
      </div>
      <div class="modal-input-wrapper">
        <input size="40" type="password">
        <span class="bar"></span>
        <label>Password</label>
      </div>
      <div class="row centered">
        <button class="registerModalButton" (click)="close()">Create account</button>
      </div>
    `,

    // Tooltip template (custom)
    /* Arguments:
       0 - header text <string>
       1 - body text <string>
       2 - button text <string>
       3 - max-width <number>
     */
    tooltip: `
      <div class="modal-tooltip">
        <h2 class="tooltipHeader">Tooltip header</h2>
        <div class="separator"></div>
        <p class="tooltipText">Tooltip message</p>
        <button class="closeTooltipButton">Close</button>
      </div>
    `
  };

  public contexts: {[id: string]: (modal: ModalComponent, ...args: any[]) => void} = {
    'register': modal => {
      this.getModalElementByClass(modal, '.registerModalButton')
        .addEventListener('click', () => { console.log("Created account")});
    },
    'tooltip': (modal, args) => {
      (modal.getElement().querySelectorAll('*').item(0) as HTMLElement).style.borderRadius = '40px';
      this.getModalElementByClass(modal, '.tooltipHeader').innerHTML = args[0];
      this.getModalElementByClass(modal, '.tooltipText').innerHTML = args[1];
      this.getModalElementByClass(modal, '.closeTooltipButton').innerHTML = args[2];
      this.getModalElementByClass(modal, '.closeTooltipButton')
        .addEventListener('click', () => {modal.hide()});
      this.getModalElementByClass(modal, '.modal-tooltip').style.maxWidth = args[3];
    }
  };

  public registerModal(id: string, modal: ModalComponent): void {
    ModalInspector.add(id, modal);
    console.log(`registered ${modal.modalTemplateId} as ${id}`);
  }

  public showModal(windowId: string): void {
    const modal = ModalInspector.get(windowId[0]);
    if (modal !== null || undefined) {
      modal.show();
    }
  }

  private getModalElementByClass(modal: ModalComponent, className: string): HTMLElement {
    return modal.getElement().querySelectorAll('*').item(0).querySelector(className);
  }

  public focus(modal: ModalComponent): void {
    this.focusedModal = modal;
  }

  ngOnDestroy(): void {
    console.log("Modal service destroyed");
  }
}
