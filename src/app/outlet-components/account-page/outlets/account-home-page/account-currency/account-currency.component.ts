import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import LocalUser from "../../../../../../scripts/ts/utils/LocalUser";
import StringUtils from "../../../../../../scripts/ts/utils/StringUtils";

@Component({
  selector: 'app-account-currency',
  templateUrl: './account-currency.component.html',
  styleUrls: ['./account-currency.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.85)' }),
        animate('1200ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ])
    ])
  ]
})
export class AccountCurrencyComponent implements OnInit {
  @Input() currencyName: string;

  public get value(): string {
    const currency = LocalUser.user.ownedCoins[this.currencyName.toLowerCase()].toString();
    if (currency !== undefined) {
      console.log("Currency: ");
      console.log(currency);
      return currency.toString().replace('.', ',').substring(0, 10);
    }
    return "Not found";
  }

  public get initials(): string {
    return StringUtils.getThreeInitials(this.currencyName).toUpperCase();
  }

  public get currName() {
    return StringUtils.capitalize(this.currencyName);
  }

  constructor() { }

  ngOnInit(): void {

  }
}
