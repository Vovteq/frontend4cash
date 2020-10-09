import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import { CurrencyService } from "../services/currency.service";
import Currency from "../../scripts/ts/currency/Currency";
import StringUtils from "../../scripts/ts/utils/StringUtils";

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit, AfterViewInit {
  public series = [{name: 'Price', data: [1, 2, 3]}];
  public xaxis = {categories: [1, 2, 3]};

  @Input() chart;
  @Input() id: string;
  @Input() requestData: boolean;

  public data: Currency;
  private _lastPrice: number;

  constructor(private currencyService: CurrencyService) { }

  get lastPrice(): number {
    return this._lastPrice || 0;
  }

  ngOnInit(): void {
    if (this.requestData) {
      this.currencyService.getCurrency(this.id).subscribe( data => {
        this.data = Currency.fromJson(this.id, data);
        this.render();
      });
    } else {
      this.setDefault();
      this.render();
    }
  }

  private render() {
    this.series = [{name: 'Price', data: this.data.priceStory.getValues().map(entry => entry as unknown as number)}];
    this.xaxis = {categories: this.data.priceStory.getKeys().map(entry => entry as unknown as number) };
    this.updateValues();
  }

  private updateValues() {
    this._lastPrice = this.data ? this.data.priceStory.get(0).value as unknown as number : 0;
  }

  ngAfterViewInit(): void {
    if (this.data === undefined) {
      this.setDefault();
      this.render();
    }
  }

  getName(): string {
    return StringUtils.capitalize(this.id);
  }

  setDefault(): void {
    //this.data = new Currency(this.id, [[1, 1], [2, 2], [3, 3]]);
  }
}
