 import {Injectable, isDevMode, OnDestroy} from '@angular/core';
import {ModalComponent} from "../general-components/modal/modal.component";
import ModalInspector from "../../scripts/ts/utils/ModalInspector";
import {UserService} from "./user.service";
import {PostService} from "./post.service";
import {Post} from "../../scripts/ts/metadata/Post";
import {User, UserInfo} from "../../scripts/ts/metadata/User";
 import {mod} from "ngx-bootstrap/chronos/utils";
 import {CurrencyService} from "./currency.service";
 import {Currency, CurrencyPrice} from "../../scripts/ts/metadata/Currency";
 import LocalUser from "../../scripts/ts/utils/LocalUser";
 import StringUtils from "../../scripts/ts/utils/StringUtils";

@Injectable()
export class ModalService implements OnDestroy{
  public focusedModal: ModalComponent;

  constructor(private userService: UserService, private postService: PostService, private currencyService: CurrencyService) {}

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
        <label>E-mail</label>
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
    // Tooltip template (custom)
    /* Arguments:
       0 - header text <string>
       1 - body text <string>
       2 - max width <number>
     */
    mini_tooltip: `
      <div class="modal-mini-tooltip">
        <h2 class="tooltipHeader">Tooltip header</h2>
        <p class="tooltipText">Tooltip message</p>
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
    `,

    exchange_cash2crypto: `
      <h2>Exchange</h2>
      <p style="color:#575757; font-weight: lighter; font-size: 24px;">Exchange cash to cryptocurrency</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="exchangeFrom" type="number">
        <span class="bar"></span>
        <label>You will give (USD):</label>
      </div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="cryptoName" type="text">
        <span class="bar"></span>
        <label>Currency name</label>
      </div>
      <p style="font-size: 24px">You will get:</p>
      <p class="valueField" style="font-size: 30px; color: #14c477">0</p>
      <div class="loading" style="display: none; position: absolute; width: 110%; height: 102%; backdrop-filter: blur(4px)">
        <div class="loading-element" style="position: absolute; left: 40%; top: 40%; transform: translate(-40%; -40%); width: fit-content; height: fit-content;">
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
        </div>
      </div>

      <div class="success" style="display: none; flex-direction: column; align-items: center; justify-content: center; position: absolute; width: 110%; height: 102%; backdrop-filter: blur(8px)">
        <p style="text-shadow: 0 0 20px rgba(82,207,54,0.4); color: #52cf36;font-size: 70px; border-radius: 50%; border: 2px solid #52cf36; padding: 0 1.5rem">✓</p>
        <p style="text-shadow: 0 0 10px rgba(82,207,54,0.4); color: #52cf36; font-size: 55px">Success</p>
      </div>

      <p class="error" style="font-size: 20px; color: #cd2c38"></p>
      <button class="confirmExchangeButton" style="font-size: 20px">Confirm</button>
    `,

    exchange_crypto2crypto: `
      <h2>Exchange</h2>
      <p style="color:#575757; font-weight: lighter; font-size: 24px;">Exchange crypto to crypto</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="exchangeAmount" type="number">
        <span class="bar"></span>
        <label class="giveLabel">You will give:</label>
      </div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="exchangeFrom" type="text">
        <span class="bar"></span>
        <label>Currency name (you give):</label>
      </div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="exchangeTo" type="text">
        <span class="bar"></span>
        <label>Currency name (you receive):</label>
      </div>
      <p style="font-size: 24px">You will get:</p>
      <p class="valueField" style="font-size: 30px; color: #14c477">0</p>
      <div class="loading" style="display: none; position: absolute; width: 110%; height: 102%; backdrop-filter: blur(4px)">
        <div class="loading-element" style="position: absolute; left: 40%; top: 40%; transform: translate(-40%; -40%); width: fit-content; height: fit-content;">
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
        </div>
      </div>

      <div class="success" style="display: none; flex-direction: column; align-items: center; justify-content: center; position: absolute; width: 110%; height: 102%; backdrop-filter: blur(8px)">
        <p style="text-shadow: 0 0 20px rgba(82,207,54,0.4); color: #52cf36;font-size: 70px; border-radius: 50%; border: 2px solid #52cf36; padding: 0 1.5rem">✓</p>
        <p style="text-shadow: 0 0 10px rgba(82,207,54,0.4); color: #52cf36; font-size: 55px">Success</p>
      </div>

      <p class="error" style="font-size: 20px; color: #cd2c38"></p>
      <button class="confirmExchangeButton" style="font-size: 20px">Confirm</button>
    `,

    exchange_crypto2cash: `
      <h2>Exchange</h2>
      <p style="color:#575757; font-weight: lighter; font-size: 24px;">Exchange cryptocurrency to cash</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="exchangeFrom" type="number">
        <span class="bar"></span>
        <label class="giveLabel">You will give:</label>
      </div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="cryptoName" type="text">
        <span class="bar"></span>
        <label>Currency name</label>
      </div>
      <p style="font-size: 24px">You will get:</p>
      <p class="valueField" style="font-size: 30px; color: #14c477">0</p>
      <div class="loading" style="display: none; position: absolute; width: 110%; height: 102%; backdrop-filter: blur(4px)">
        <div class="loading-element" style="position: absolute; left: 40%; top: 40%; transform: translate(-40%; -40%); width: fit-content; height: fit-content;">
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
        </div>
      </div>

      <div class="success" style="display: none; flex-direction: column; align-items: center; justify-content: center; position: absolute; width: 110%; height: 102%; backdrop-filter: blur(8px)">
        <p style="text-shadow: 0 0 20px rgba(82,207,54,0.4); color: #52cf36;font-size: 70px; border-radius: 50%; border: 2px solid #52cf36; padding: 0 1.5rem">✓</p>
        <p style="text-shadow: 0 0 10px rgba(82,207,54,0.4); color: #52cf36; font-size: 55px">Success</p>
      </div>

      <p class="error" style="font-size: 20px; color: #cd2c38"></p>
      <button class="confirmExchangeButton" style="font-size: 20px">Confirm</button>
    `,

    payment: `
      <h2>Payment</h2>
      <p style="color:#575757; font-weight: lighter; font-size: 24px;">Top up your account balance</p>
      <div class="separator"></div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="paymentAmount" type="number" step="1" min="0">
        <span class="bar"></span>
        <label>You will pay (USD)</label>
      </div>
      <button class="confirmPayment" style="font-size: 20px">Confirm</button>
      <div class="separator"></div>
      <button class="close" style="font-size: 20px; opacity: 1; padding: 0.5rem 1rem; border-radius: 10px">Close</button>
    `,

    change_attr: `
      <h2 class="header">Change attribute</h2>
      <div class="separator"></div>
      <div class="modal-input-wrapper" style="margin-bottom: 1rem">
        <input style="font-size: 20px" class="newAttr" type="text">
        <span class="bar"></span>
        <label class="label"></label>
      </div>
      <button class="confirmChange" style="font-size: 20px">Confirm</button>
      <div class="separator"></div>
      <div class="loading" style="display: none; position: absolute; width: 110%; height: 102%; backdrop-filter: blur(4px)">
        <div class="loading-element" style="position: absolute; left: 37%; top: 37%; transform: translate(-37%; -37%); width: fit-content; height: fit-content;">
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
          <div style="background: #4287f5"></div>
        </div>
      </div>
      <p class="error" style="font-size: 20px; color: #cd2c38"></p>
      <button class="close" style="font-size: 20px; opacity: 1; padding: 0.5rem 1rem; border-radius: 10px">Close</button>
    `,

  };

  public contexts: {[id: string]: (modal: ModalComponent, ...args: any[]) => void} = {
    'register': modal => {
      ModalService.getModalElementByClass(modal, '.registerModalButton')
        .addEventListener('click', () => {
          const nickname = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.register-nickname');
          const email = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.register-email');
          const password = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.register-password');
          this.userService.register(email.value, nickname.value, password.value).then(() => {
            this.userService.logIn(email.value, password.value).then(() => {
              modal.hide();
              ModalInspector.get('newcomer-tooltip-modal').hide();
            });
          }).catch((error) => {
            const errorMessage = isDevMode() ? `(DEV)REGISTER_ERR[${error}]` : `Something went wrong. Please, check entered data.`;
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
    'mini_tooltip': (modal, args) => {
      const wrapper =  (modal.getElement().querySelectorAll('*').item(0) as HTMLElement);
      wrapper.style.borderRadius = '5px';
      wrapper.style.backgroundColor = '#2d2d2d';
      wrapper.style.border = 'none';
      wrapper.style.color = '#fff';
      wrapper.style.padding = '0.5rem';
      wrapper.style.boxShadow = '0 0 15px 0 rgba(0,0,0,0.4)';
      wrapper.style.minWidth = args[2] + 'px';
      ModalService.getModalElementByClass(modal, '.tooltipHeader').innerHTML = args[0];
      ModalService.getModalElementByClass(modal, '.tooltipText').innerHTML = args[1];
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
        this.userService.logIn(alias, pass).then(() => { modal.hide(); ModalInspector.get('register-modal')?.hide();}).catch((error) => {
          console.log(error);
          const errorMessage = isDevMode() ? `(DEV)LOGIN_ERR[${error}]` : `Something went wrong. Please, check entered e-mail and password.`;
          ModalService.getModalElementByClass(modal, '.loginModalError').innerHTML = errorMessage;
        });
      })
    },
    'exchange_cash2crypto': modal => {
      const inputField = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.exchangeFrom');
      const valueField = ModalService.getModalElementByClass<HTMLElement>(modal, '.valueField');
      const confirm = ModalService.getModalElementByClass<HTMLButtonElement>(modal, '.confirmExchangeButton');
      const crypto = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.cryptoName');
      const error = ModalService.getModalElementByClass<HTMLElement>(modal, '.error');
      const loading = ModalService.getModalElementByClass<HTMLElement>(modal, '.loading');
      const success = ModalService.getModalElementByClass<HTMLElement>(modal, '.success');


      let currentPrice = undefined;
      let finalPrice = 0;

      function updatePrice() {
        const inputValue = inputField.value;
        let sValue = 0;
        if (inputValue.length > 0) {
          sValue = parseInt(inputValue);
          if (sValue <= 0) {
            error.innerHTML = "You should give more than 0 USD.";
            return;
          }
        } else {
          return;
        }
        finalPrice = (sValue / currentPrice);
        error.innerHTML = "";
        valueField.innerHTML = finalPrice.toFixed(8) + ` ${StringUtils.capitalize(crypto.value)}s`;
      }

      crypto.addEventListener('change', (event) => {
        loading.style.display = 'block';
        this.currencyService.getCurrency(crypto.value.toLowerCase()).subscribe((price: CurrencyPrice) => {
          currentPrice = parseFloat(Currency.fromJson('bitcoin', price).priceStory.last().value);
          error.innerHTML = "";
          loading.style.display = 'none';
          updatePrice();
        }, error1 => { currentPrice = undefined; valueField.innerHTML = "0"; error.innerHTML = "Wrong currency name."; loading.style.display = 'none';  });
      })

      inputField.addEventListener('input', (event) => {
        if (currentPrice === undefined) {
          finalPrice = 0;
          valueField.innerHTML = "0";
          return;
        }
        updatePrice();
      });
      confirm.addEventListener('click', () => {
        if (currentPrice === undefined || finalPrice <= 0) {
          error.innerHTML = "Wrong field data."
          return;
        }
        const price = parseInt(inputField.value);
        if (parseFloat(LocalUser.user.cash) >= price) {
          if (isDevMode()) {
            if (LocalUser.user.ownedCoins[crypto.value] !== undefined) {
              LocalUser.user.ownedCoins[crypto.value] = (parseFloat(LocalUser.user.ownedCoins[crypto.value]) + finalPrice).toString();
            } else {
              LocalUser.user.ownedCoins[crypto.value] = finalPrice.toString();
            }

            LocalUser.user.cash = (parseFloat(LocalUser.user.cash) - price).toString();
            error.innerHTML = "";
            loading.style.display = 'block';
            setTimeout(() => {
              loading.style.display = 'none';
              success.style.display = 'flex';
            }, 2000);
            setTimeout(() => {
              modal.hide();
            }, 4000);
          } else {
            loading.style.display = 'block';
            this.currencyService.changeCurrency(finalPrice, crypto.value.toLowerCase(), "buy").then(() => {
              error.innerHTML = "";
              success.style.display = 'flex';
              loading.style.display = 'none';
              this.userService.updateUserData();
              setTimeout(() => {
                modal.hide();
              }, 2000);
            }).catch(() => {
              error.innerHTML = "Something went wrong, please, try again.";
              loading.style.display = 'none';
            });
          }
        } else {
          error.innerHTML = "You have not enough money."
        }
      });
    },

    'exchange_crypto2crypto': modal => {
      const amountField = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.exchangeAmount');
      const fromCurrencyField = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.exchangeFrom');
      const toCurrencyField = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.exchangeTo');
      const giveLabel = ModalService.getModalElementByClass<HTMLElement>(modal, '.giveLabel');
      const valueField = ModalService.getModalElementByClass<HTMLElement>(modal, '.valueField');
      const error = ModalService.getModalElementByClass<HTMLElement>(modal, '.error');
      const loading = ModalService.getModalElementByClass<HTMLElement>(modal, '.loading');
      const success = ModalService.getModalElementByClass<HTMLElement>(modal, '.success');
      const confirm = ModalService.getModalElementByClass<HTMLButtonElement>(modal, '.confirmExchangeButton');

      let finalPrice = 0;
      let fromPrice: number = undefined;
      let toPrice: number = undefined;

      function updatePrice() {
        if (fromPrice === undefined || toPrice === undefined) {
          return;
        }
        const amountValue = parseFloat(amountField.value);
        if (isNaN(amountValue)) {
          return;
        }

        const fromEffectivePrice = fromPrice * amountValue;
        if (amountValue <= 0) {
          error.innerHTML = "You should give more than 0 currency.";
          return;
        }
        finalPrice = (fromEffectivePrice / toPrice)
        error.innerHTML = "";
        valueField.innerHTML = finalPrice.toFixed(8) + ` ${StringUtils.capitalize(toCurrencyField.value)}s`;
      }

      fromCurrencyField.addEventListener('change', (event) => {
        loading.style.display = 'block';
        this.currencyService.getCurrency(fromCurrencyField.value.toLowerCase()).subscribe((price: CurrencyPrice) => {
          if (LocalUser.user.ownedCoins[fromCurrencyField.value] === undefined) {
            error.innerHTML = "You dont have such currency."
            loading.style.display = 'none';
            return;
          }
          fromPrice = parseFloat(Currency.fromJson('bitcoin', price).priceStory.last().value);
          error.innerHTML = "";
          loading.style.display = 'none';
          giveLabel.innerHTML = `You will give (${StringUtils.getThreeInitials(fromCurrencyField.value)}):`;
          updatePrice();
        }, error1 => { fromPrice = undefined; valueField.innerHTML = "0"; error.innerHTML = "Wrong currency name."; loading.style.display = 'none';  });
      });

      toCurrencyField.addEventListener('change', (event) => {
        loading.style.display = 'block';
        this.currencyService.getCurrency(toCurrencyField.value.toLowerCase()).subscribe((price: CurrencyPrice) => {
          toPrice = parseFloat(Currency.fromJson('bitcoin', price).priceStory.last().value);
          error.innerHTML = "";
          loading.style.display = 'none';
          updatePrice();
        }, error1 => { toPrice = undefined; valueField.innerHTML = "0"; error.innerHTML = "Wrong currency name."; loading.style.display = 'none';  });
      });

      amountField.addEventListener('input', (event) => {
        updatePrice();
      });

      confirm.addEventListener('click', () => {
        if (finalPrice === 0) {
          error.innerHTML = "All fields are required.";
          return;
        }

        if (isDevMode()) {
          if (LocalUser.user.ownedCoins[toCurrencyField.value] !== undefined) {
            LocalUser.user.ownedCoins[toCurrencyField.value] = (parseFloat(LocalUser.user.ownedCoins[toCurrencyField.value]) + finalPrice).toString();
          } else {
            LocalUser.user.ownedCoins[toCurrencyField.value] = finalPrice.toString();
          }

          LocalUser.user.ownedCoins[fromCurrencyField.value] = (parseFloat(LocalUser.user.ownedCoins[fromCurrencyField.value]) - parseFloat(amountField.value)).toString();

          error.innerHTML = "";
          loading.style.display = 'block';
          setTimeout(() => {
            loading.style.display = 'none';
            success.style.display = 'flex';
          }, 2000);
          setTimeout(() => {
            modal.hide();
          }, 4000);
        } else {
          loading.style.display = 'block';
          error.innerHTML = "";
          this.currencyService.changeCurrency(parseFloat(amountField.value), fromCurrencyField.value.toLowerCase(), "sell").then(() => {
            this.currencyService.changeCurrency(finalPrice, toCurrencyField.value.toLowerCase(), "buy").then(() => {
              success.style.display = 'flex';
              loading.style.display = 'none';
              this.userService.updateUserData();
              setTimeout(() => {
                modal.hide();
              }, 2000);
            }).catch(() => {
              error.innerHTML = "Something went wrong, please, try again.";
              loading.style.display = 'none';});
          }).catch(() => {
            error.innerHTML = "Something went wrong, please, try again.";
            loading.style.display = 'none';
          });
        }
      })
    },

    'payment': (modal, args) => {
      const inputField = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.paymentAmount');
      const confirm = ModalService.getModalElementByClass<HTMLButtonElement>(modal, '.confirmPayment');
      const close = ModalService.getModalElementByClass<HTMLButtonElement>(modal, '.close');

      confirm.addEventListener('click', () => {
        const inputNum = parseInt(inputField.value);
        if (inputField.value.length > 0 && inputNum > 0) {
          if (isDevMode()) {
            args[0](inputNum);
            LocalUser.user.cash = (parseFloat(LocalUser.user.cash) + inputNum).toString();
            modal.hide();
          } else {
            this.userService.addCash(inputNum).then(() => {
              args[0](inputNum);
              LocalUser.user.cash = (parseFloat(LocalUser.user.cash) + inputNum).toString();
              modal.hide();
            }).catch(() => {
              console.log("ZagruZka babla (Cash, $, bucks) ne udalas (((((((");
              modal.hide();
            });
          }
        }
      });

      close.addEventListener('click', () => {
        modal.hide();
      });
    },
    'change_attr': (modal, args) =>  {
      const inputField = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.newAttr');
      const confirm = ModalService.getModalElementByClass<HTMLButtonElement>(modal, '.confirmChange');
      const close = ModalService.getModalElementByClass<HTMLButtonElement>(modal, '.close');
      const loading = ModalService.getModalElementByClass<HTMLElement>(modal, '.loading');
      const error = ModalService.getModalElementByClass<HTMLElement>(modal, '.error');
      const label = ModalService.getModalElementByClass<HTMLElement>(modal, '.label');
      const header = ModalService.getModalElementByClass<HTMLElement>(modal, '.header');

      const attribute: string = args[0];
      label.innerHTML = `New ${attribute}`
      header.innerHTML = `Change ${attribute}`

      confirm.addEventListener('click', () => {
        const input = inputField.value;
        if (input.length === 0) {
          error.innerHTML = "Input is empty."
          return;
        }
        if (isDevMode()) {
          loading.style.display = 'block';
          error.innerHTML = "";
          setTimeout(() => {
            if (attribute === 'username') {
              LocalUser.user.username = inputField.value;
            } else if(attribute === 'e-mail') {
              LocalUser.user.email = inputField.value;
            } else {
              LocalUser.user.status = inputField.value;
            }
            modal.hide();
          }, 1000);
        } else {
          loading.style.display = 'block';
          error.innerHTML = "";
          this.userService.changeAttribute(inputField.value, attribute).then(() => {
            location.reload();
          }).catch(() => {
            error.innerHTML = "Something went wrong."
            loading.style.display = 'none';
          });
        }
      });

      close.addEventListener('click', () => {
        modal.hide();
      });
    },

    'exchange_crypto2cash': modal => {
      const inputField = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.exchangeFrom');
      const valueField = ModalService.getModalElementByClass<HTMLElement>(modal, '.valueField');
      const confirm = ModalService.getModalElementByClass<HTMLButtonElement>(modal, '.confirmExchangeButton');
      const crypto = ModalService.getModalElementByClass<HTMLInputElement>(modal, '.cryptoName');
      const error = ModalService.getModalElementByClass<HTMLElement>(modal, '.error');
      const loading = ModalService.getModalElementByClass<HTMLElement>(modal, '.loading');
      const success = ModalService.getModalElementByClass<HTMLElement>(modal, '.success');

      let currentPrice = undefined;
      let finalPrice = 0;

      function updatePrice() {
        if (currentPrice === undefined) {
          return;
        }
        const inputValue = parseFloat(inputField.value);

        if (inputValue <= 0) {
          error.innerHTML = "You must give more than 0 currency";
          return;
        }

        finalPrice = (inputValue * currentPrice);
        error.innerHTML = "";
        valueField.innerHTML = finalPrice.toFixed(8) + `$`;
      }

      crypto.addEventListener('change', (event) => {
        loading.style.display = 'block';
        this.currencyService.getCurrency(crypto.value.toLowerCase()).subscribe((price: CurrencyPrice) => {
          if (LocalUser.user.ownedCoins[crypto.value] === undefined) {
            error.innerHTML = "You dont have such currency."
            loading.style.display = 'none';
            return;
          }
          currentPrice = parseFloat(Currency.fromJson('bitcoin', price).priceStory.last().value);
          error.innerHTML = "";
          loading.style.display = 'none';
          updatePrice();
        }, error1 => { currentPrice = undefined; valueField.innerHTML = "0"; error.innerHTML = "Wrong currency name."; loading.style.display = 'none';  });
      })

      inputField.addEventListener('input', (event) => {
        if (currentPrice === undefined) {
          finalPrice = 0;
          valueField.innerHTML = "0";
          return;
        }
        updatePrice();
      });
      confirm.addEventListener('click', () => {
        if (currentPrice === undefined || finalPrice <= 0) {
          error.innerHTML = "Wrong field data."
          return;
        }

        if (parseFloat(LocalUser.user.ownedCoins[crypto.value]) >= parseFloat(inputField.value)) {
          if (isDevMode()) {
            LocalUser.user.ownedCoins[crypto.value] = (parseFloat(LocalUser.user.ownedCoins[crypto.value]) - parseFloat(inputField.value)).toString();
            LocalUser.user.cash = (parseFloat(LocalUser.user.cash) + finalPrice).toString();
            if(parseFloat(LocalUser.user.ownedCoins[crypto.value]) === 0) {
              delete LocalUser.user.ownedCoins[crypto.value];
            }

            error.innerHTML = "";
            loading.style.display = 'block';
            setTimeout(() => {
              loading.style.display = 'none';
              success.style.display = 'flex';
            }, 2000);
            setTimeout(() => {
              modal.hide();
            }, 4000);
          } else {
            loading.style.display = 'block';
            this.currencyService.changeCurrency(parseFloat(inputField.value), crypto.value.toLowerCase(), "sell").then(() => {
              error.innerHTML = "";
              success.style.display = 'flex';
              loading.style.display = 'none';
              this.userService.updateUserData();
              setTimeout(() => {
                modal.hide();
              }, 2000);
            }).catch(() => {
              error.innerHTML = "Something went wrong, please, try again.";
              loading.style.display = 'none';
            });
          }
        } else {
          error.innerHTML = "You have not enough crypto."
        }
      });
    }
  }

  public registerModal(id: string, modal: ModalComponent): void {
    ModalInspector.add(id, modal);
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
