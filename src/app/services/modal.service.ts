import { Injectable, OnDestroy } from '@angular/core';
import {ModalComponent} from "../general-components/modal/modal.component";
import {Dictionary} from "../../scripts/ts/data-handling/Dictionary";
import ModalInspector from "../../scripts/ts/utils/ModalInspector";

@Injectable()
export class ModalService implements OnDestroy{

  public focusedModal: ModalComponent;

  constructor() { }

  public modals: {[id: string]: string} = {
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
        <button (click)="close()">Create account</button>
      </div>
    `
  };

  public contexts: {[id: string]: (modal: ModalComponent) => void} = {
    register: modal => {
      console.log(`context: ${modal.id}`);
    }
  };

  public registerModal(id: string, modal: ModalComponent): void {
    ModalInspector.add(id, modal);
    console.log(`registered ${modal.modalTemplateId} as ${id}`);
  }

  public showModal(windowId: string): void {
    const modal = ModalInspector.get(windowId[0]);
    if (modal !== null || undefined) {
      modal.show(true);
    }
  }

  ngOnDestroy(): void {
    console.log("Modal service destroyed");
  }
}
