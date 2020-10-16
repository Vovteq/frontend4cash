import {Component, Input, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Currency} from "../../../scripts/ts/metadata/Currency";
import StringUtils from "../../../scripts/ts/utils/StringUtils";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  public header: string = "C_ID";
  public value: string = "C_VAL";

  @Input() requestData: boolean;
  @Input() currencyId: string;

  private data: Currency;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    if (this.requestData) {
      this.currencyService.getCurrency(this.currencyId).subscribe(data => {
        this.data = new Currency(this.currencyId, data);
        this.header = StringUtils.capitalize(this.data.id);
        this.value = `${this.data.priceStory.last().value} ${this.currencyService.globalCurrency}`;
      });
    }
  }

}
