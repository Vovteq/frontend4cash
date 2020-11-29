import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

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
  @Input() currencyId;

  constructor() { }

  ngOnInit(): void {
  }

}
