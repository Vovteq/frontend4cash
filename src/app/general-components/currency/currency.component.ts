import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Currency} from "../../../scripts/ts/metadata/Currency";
import StringUtils from "../../../scripts/ts/utils/StringUtils";
import {ConnectionService} from "../../services/connection.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  animations: [
    trigger('showNoConnection', [
      transition(':enter', [
        style({ opacity: 0, position: 'absolute' }),
        animate('700ms cubic-bezier(0.680, -0.550, 0.460, 0.995)', style({ opacity: '1', position: 'absolute' })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('700ms cubic-bezier(0.680, -0.550, 0.460, 0.995)', style({ opacity: '0', position: 'absolute' })),
      ])
    ])
  ]
})
export class CurrencyComponent implements OnInit {
  public header: string = "C_ID";
  public value: string = "C_VAL";

  @Input() requestData: boolean;
  @Input() currencyId: string;

  private data: Currency;

  constructor(private currencyService: CurrencyService, public connectionService: ConnectionService, private el: ElementRef) { }

  ngOnInit(): void {
    if (this.requestData) {
      this.currencyService.getCurrency(this.currencyId).subscribe(data => {
        this.data = Currency.fromJson(this.currencyId, data);
        this.header = StringUtils.capitalize(this.data.id);
        this.value = `${this.data.priceStory.last().value} ${this.currencyService.globalCurrency}`;
      });
    }
  }

}
