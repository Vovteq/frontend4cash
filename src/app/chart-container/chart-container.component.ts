import {Component, Input, OnInit} from '@angular/core';
import { CurrencyService } from "../services/currency.service";
import Currency from "../../scripts/ts/currency/Currency";

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {
  private series;
  private xaxis;

  @Input() chart;
  @Input() id: string;
  @Input() requestData: boolean;

  private data: Currency;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    if (this.requestData) {

      this.currencyService.getCurrency(this.id).subscribe( data => {
        this.data = data;
      });

      console.log(this.data);

      /*
      this.data = new Currency("Bitcoin",
        { date: '2014', price: 100 },
        { date: '2015', price: 120 },
        { date: '2016', price: 150 },
        { date: '2017', price: 130 },
        { date: '2018', price: 200 },
        );
      this.title = this.data.id;
      this.series = [{name: 'Price', data: this.data.priceStory.getValues()}];
      this.xaxis = {categories: this.data.priceStory.getKeys() };

       */
    }
  }

}
