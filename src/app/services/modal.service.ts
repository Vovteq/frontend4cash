import {Injectable, OnDestroy} from '@angular/core';
import {ModalComponent} from "../general-components/modal/modal.component";
import ModalInspector from "../../scripts/ts/utils/ModalInspector";
import {UserService} from "./user.service";

@Injectable()
export class ModalService implements OnDestroy{
  public focusedModal: ModalComponent;

  constructor(private userService: UserService) {}

  // Custom modal templates. Used by modals to match specific template.
  public modals: {[id: string]: string} = {
    // Register template (standard)
    register: `
      <h2>Register</h2>
      <p>Create new account and start trading now!</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper">
        <input size="40" type="email" class="register-email">
        <span class="bar"></span>
        <label>E-mail</label>
      </div>
      <div class="modal-input-wrapper">
        <input size="40" type="password">
        <span class="bar"></span>
        <label>Password</label>
      </div>
      <div class="row centered">
        <button class="registerModalButton">Create account</button>
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
    `,

    // Write-post-window template (standard)
    write_post: `
      <h2 style="color: #575757">Write new post</h2>
      <p style="color:#575757;">Share your ideas with the community</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper">
        <input size="40">
        <span class="bar"></span>
        <label>Post title</label>
      </div>
      <div class="modal-input-wrapper">
        <textarea rows="6"></textarea>
        <span class="bar"></span>
        <label>Message</label>
      </div>
      <button class="writePostButton" style="font-size: 20px">Post</button>
    `
  };

  public contexts: {[id: string]: (modal: ModalComponent, ...args: any[]) => void} = {
    'register': modal => {
      this.getModalElementByClass(modal, '.registerModalButton')
        .addEventListener('click', () => {
          this.userService.logIn({nickname: this.getModalElementByClass<HTMLInputElement>(modal, '.register-email').value});
          modal.hide();
          ModalInspector.get('newcomer-tooltip-modal').hide();
        });
    },
    'tooltip': (modal, args) => {
      (modal.getElement().querySelectorAll('*').item(0) as HTMLElement).style.borderRadius = '40px';
      this.getModalElementByClass(modal, '.tooltipHeader').innerHTML = args[0];
      this.getModalElementByClass(modal, '.tooltipText').innerHTML = args[1];
      this.getModalElementByClass(modal, '.closeTooltipButton').innerHTML = args[2];
      this.getModalElementByClass(modal, '.closeTooltipButton')
        .addEventListener('click', () => {modal.hide()});
      this.getModalElementByClass<HTMLElement>(modal, '.modal-tooltip').style.maxWidth = args[3];
    },
    'write_post': modal => {
      this.getModalElementByClass(modal, '.writePostButton').addEventListener('click', () => {
        console.log("post posted");
      })
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

  private getModalElementByClass<T extends Element>(modal: ModalComponent, className: string): T {
    return modal.getElement().querySelectorAll('*').item(0).querySelector(className);
  }

  public focus(modal: ModalComponent): void {
    this.focusedModal = modal;
  }

  ngOnDestroy(): void {
    console.log("Modal service destroyed");
  }
}
