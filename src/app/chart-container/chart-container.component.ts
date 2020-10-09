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

  private data: Currency;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    if (this.requestData) {
      this.currencyService.getCurrency(this.id).subscribe( data => {
        this.data = Currency.fromJson(this.id, data.prices);
        this.render();
      });
    }
  }

  private render() {
    this.series = [{name: 'Price', data: this.data.priceStory.getValues().map(entry => entry as unknown as number)}];
    this.xaxis = {categories: this.data.priceStory.getKeys().map(entry => entry as unknown as number) };
  }

  ngAfterViewInit(): void {
    if (this.data === undefined) {
      this.render();
    }
  }
}
