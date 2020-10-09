import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import { CurrencyService } from "../services/currency.service";
import Currency from "../../scripts/ts/currency/Currency";

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

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    if (this.requestData) {
      this.currencyService.getCurrency(this.id).subscribe( data => {
        this.data = Currency.fromJson(this.id, data);
        console.log(this.data.priceStory.get(0).key);
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
  }

  ngAfterViewInit(): void {
    if (this.data === undefined) {
      this.setDefault();
      this.render();
    }
  }

  setDefault(): void {
    this.data = new Currency(this.id, [[1, 1], [2, 2], [3, 3]]);
  }
}
