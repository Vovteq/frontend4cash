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
  @Input() currencyInfo: {coin: string, amount: string};

  public get value(): string {
    if (this.currencyInfo !== undefined) {
      return parseFloat(this.currencyInfo.amount) < 100000 ?
        StringUtils.roundStrDecimal(this.currencyInfo.amount, 10)
        : StringUtils.roundStrDecimal(this.currencyInfo.amount, 2);
    }
    return "Not found";
  }

  public get initials(): string {
    return StringUtils.getThreeInitials(this.currencyInfo.coin).toUpperCase();
  }

  public get currName() {
    return StringUtils.capitalize(this.currencyInfo.coin);
  }

  constructor() { }

  ngOnInit(): void {

  }
}
