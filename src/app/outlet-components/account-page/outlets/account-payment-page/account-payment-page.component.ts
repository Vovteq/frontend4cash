import {Component, OnInit, ViewChildren} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {UserService} from "../../../../services/user.service";
import {UserInfo} from "../../../../../scripts/ts/metadata/User";
import LocalUser from "../../../../../scripts/ts/utils/LocalUser";
import {animate, style, transition, trigger} from "@angular/animations";
import Tweener from "../../../../../scripts/ts/utils/Tweener";

@Component({
  selector: 'app-account-payment-page',
  templateUrl: './account-payment-page.component.html',
  styleUrls: ['./account-payment-page.component.scss'],
  animations: [
    trigger('showHeader', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px) scale(1.1)' }),
        animate('500ms cubic-bezier(0.645, 0.045, 0.355, 1.000)', style({ opacity: 1, transform: 'translateY(-40px) scale(1.1)' })),
        animate('1000ms cubic-bezier(0.645, 0.045, 0.355, 1.000)', style({ transform: 'translateY(0) scale(1)' })),
      ])
    ]),
    trigger('showContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px) scale(1.1)' }),
        animate('1000ms cubic-bezier(0.645, 0.045, 0.355, 1.000)', style({ transform: 'translateY(0) scale(1)', opacity: 1 })),
      ])
    ])
  ]
})
export class AccountPaymentPageComponent implements OnInit {

  private _currentCash: string;
  private static cashTweener: Tweener;

  constructor(public modalService: ModalService) { }

  public get currentCash(): string {
    if (AccountPaymentPageComponent.cashTweener !== undefined) {
      return AccountPaymentPageComponent.cashTweener.processedValue.toString();
    }
    return LocalUser.user.cash.toString();
  }

  ngOnInit(): void {
    this._currentCash = LocalUser.user.cash;
  }

  public get user(): UserInfo {
    return LocalUser.user;
  }

  public addCash(amount: number): void {
    const balanceElem = document.querySelector("#balance") as HTMLElement;
    balanceElem.classList.add("changed");
    AccountPaymentPageComponent.cashTweener = new Tweener();
    AccountPaymentPageComponent.cashTweener.onTweenDone.add(() => {
      balanceElem.classList.remove("changed");
    });
    AccountPaymentPageComponent.cashTweener.tweenValue(parseFloat(LocalUser.user.cash), parseFloat(LocalUser.user.cash) + amount, 500);
  }

}
