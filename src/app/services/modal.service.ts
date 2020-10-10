import { Injectable } from '@angular/core';
import {ModalComponent} from "../general-components/modal/modal.component";
import {Dictionary} from "../../scripts/ts/data-handling/Dictionary";

@Injectable()
export class ModalService {

  private registeredModals: Dictionary<string, ModalComponent> = new Dictionary<string, ModalComponent>();
  public focusedModal: ModalComponent;

  constructor() { }

  public modals: {[id: string]: string} = {
    register: `
      <h2>Register</h2>
      <p>Create new account and start trading now!</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper">
        <input size="40" type="email">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>E-mail</label>
      </div>
      <div class="modal-input-wrapper">
        <input size="40" type="password">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Password</label>
      </div>
      <div class="row centered"><button>Create</button></div>
    `
  };

  public registerModal(id: string, modal: ModalComponent): void {
    this.registeredModals.addPair(id, modal);
    console.log(`registered ${modal.modalTemplateId} as ${id}`);
  }

  public getModal(id: string) {
    this.registeredModals.getByKey(id);
  }
}
