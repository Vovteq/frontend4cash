import {Component, Input, OnInit} from '@angular/core';
import { CurrencyService } from "../services/currency.service";
import Currency from "../../scripts/ts/currency/Currency";

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {
  @Input() series;
  @Input() xaxis;
  @Input() chart;
  @Input() title;
  @Input() requestData: boolean;

  private data: Currency[];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    if (this.requestData) {
      console.log("requesting currency for " + this.title);
      this.currencyService.getAllCurrencies().subscribe( data => {
        this.data = data;
      });
    }
  }

}
