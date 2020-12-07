 import {Injectable, isDevMode, OnDestroy} from '@angular/core';
import {ModalComponent} from "../general-components/modal/modal.component";
import ModalInspector from "../../scripts/ts/utils/ModalInspector";
import {UserService} from "./user.service";
import {PostService} from "./post.service";
import {Post} from "../../scripts/ts/metadata/Post";
import {User, UserInfo} from "../../scripts/ts/metadata/User";

@Injectable()
export class ModalService implements OnDestroy{
  public focusedModal: ModalComponent;

  constructor(private userService: UserService, private postService: PostService) {}

  // Custom modal templates. Used by modals to match specific template.
  public modals: {[id: string]: string} = {
    // Register template (standard)
    register: `
      <h2 style="margin-bottom: 1rem">Register</h2>
      <p style="font-weight: lighter">Create new account and <br> start trading now!</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper">
        <input size="40" class="register-nickname">
        <span class="bar"></span>
        <label>Nickname</label>
      </div>
      <div class="modal-input-wrapper">
        <input size="40" type="email" class="register-email">
        <span class="bar"></span>
        <label>E-mail</label>
      </div>
      <div class="modal-input-wrapper">
        <input size="40" type="password" class="register-password">
        <span class="bar"></span>
        <label>Password</label>
      </div>
      <p class="registerModalError" style="color: #ff673d; font-size: 20px; letter-spacing: 1px; margin: 0;">

      </p>
      <div class="row centered">
        <button class="registerModalButton">Create account</button>
      </div>
    `,

    // Login template (standard)
    login: `
      <h2 style="margin-bottom: 1rem">Login</h2>
      <p>Login tooltip</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper">
        <input size="40" class="login-nickname">
        <span class="bar"></span>
        <label>Nickname or email</label>
      </div>
      <div class="modal-input-wrapper">
        <input size="40" type="password" class="login-password">
        <span class="bar"></span>
        <label>Password</label>
      </div>
      <p class="loginModalError" style="color: #ff673d; font-size: 20px; letter-spacing: 1px; margin: 0;">

      </p>
      <div class="row centered">
        <button class="loginModalButton">Log in</button>
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
        <input class="postHeader" size="40">
        <span class="bar"></span>
        <label>Post title</label>
      </div>
      <div class="modal-input-wrapper">
        <textarea class="postText" rows="6"></textarea>
        <span class="bar"></span>
        <label>Message</label>
      </div>
      <button class="writePostButton" style="font-size: 20px">Post</button>
    `
  };

  public contexts: {[id: string]: (modal: ModalComponent, ...args: any[]) => void} = {
    'register': modal => {
      ModalService.getModalElementByClass(modal, '.registerModalButton')
        .addEventListener('click', () => {
          const nickname = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.register-nickname');
          const email = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.register-email');
          const password = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.register-password');
          const info: UserInfo = { id: '0', nickname: nickname.value, password: password.value, email: email.value, ownedCoins: {}, cash: "0", status: "" };
          this.userService.registerUser(info).then((id) => {
            this.userService.logIn(id);
            modal.hide();
            ModalInspector.get('newcomer-tooltip-modal').hide();
          }).catch((error) => {
            console.log(error);
            const errorMessage = isDevMode() ? `(DEV)REGISTER_ERR[${error}]` : `Invalid alias or password`;
            ModalService.getModalElementByClass(modal, '.registerModalError').innerHTML = errorMessage;
          });
        });
    },
    'tooltip': (modal, args) => {
      (modal.getElement().querySelectorAll('*').item(0) as HTMLElement).style.borderRadius = '40px';
      ModalService.getModalElementByClass(modal, '.tooltipHeader').innerHTML = args[0];
      ModalService.getModalElementByClass(modal, '.tooltipText').innerHTML = args[1];
      ModalService.getModalElementByClass(modal, '.closeTooltipButton').innerHTML = args[2];
      ModalService.getModalElementByClass(modal, '.closeTooltipButton')
        .addEventListener('click', () => {modal.hide()});
      ModalService.getModalElementByClass<HTMLElement>(modal, '.modal-tooltip').style.maxWidth = args[3];
    },
    'write_post': modal => {
      ModalService.getModalElementByClass(modal, '.writePostButton').addEventListener('click', () => {
        const postHeader = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.postHeader');
        const postText = ModalService.getModalElementByClass<HTMLTextAreaElement>(modal, '.postText');
        this.postService.savePost(new Post("none", {
          message: postText.value,
          user: this.userService.getLocalUser()
        })).subscribe(e => { console.log("post posted!"); modal.hide();})
      })
    },
    'login': modal => {
      ModalService.getModalElementByClass(modal, '.loginModalButton').addEventListener('click', () => {
        const alias = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.login-nickname').value;
        const pass = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.login-password').value;
        this.userService.logInAlias(alias, pass).then(() => { modal.hide(); }).catch((error) => {
          console.log(error);
          const errorMessage = isDevMode() ? `(DEV)LOGIN_ERR[${error}]` : `Invalid alias or password`;
          ModalService.getModalElementByClass(modal, '.loginModalError').innerHTML = errorMessage;
        });
      })
    }
  };

  public registerModal(id: string, modal: ModalComponent): void {
    ModalInspector.add(id, modal);
    console.log(`registered ${modal.modalTemplateId} as ${id}`);
  }

  public getModal(id: string): ModalComponent {
    return ModalInspector.get(id);
  }

  public showModal(windowId): void {
    const modal = ModalInspector.get(windowId instanceof Array ? windowId[0] : windowId);
    if (modal !== null || undefined) {
      modal.show();
    } else {
      if (isDevMode()) {
        console.warn(`Modal ${windowId} can not be shown (null ref)`)
      }
    }
  }

  private static getModalElementByClass<T extends Element>(modal: ModalComponent, className: string): T {
    return modal.getElement().querySelectorAll('*').item(0).querySelector(className);
  }

  public focus(modal: ModalComponent): void {
    this.focusedModal = modal;
  }

  ngOnDestroy(): void {
    console.log("Modal service destroyed");
  }
}
