import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Currency} from "../../../scripts/ts/metadata/Currency";
import {ModalService} from "../../services/modal.service";
import {ModalComponent} from "../../general-components/modal/modal.component";
import {ChartComponent} from "ng-apexcharts";
import {Delegate} from "../../../scripts/ts/delegates/Delegate";
import {ChartContainerComponent} from "../../general-components/chart-container/chart-container.component";

@Component({
  selector: 'app-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss']
})
export class MonitoringPageComponent implements OnInit{
  public shownCurrency: Currency;
  public renderCurrencyChart: boolean;
  public error: string;

  private currencyChart: ChartContainerComponent;
  private onChartRendered: Delegate<void> = new Delegate<void>();

  @ViewChild('shownCurrencyChart', { static: false}) set chart(chart: ChartContainerComponent) {
    if (chart) {
      this.currencyChart = chart;
      this.onChartRendered.invoke();
    }
  }

  ngOnInit(): void {
    const self = this;
    this.onChartRendered.add(() => {
      self.showCurrencyChart();
    });
  }

  constructor(private currencyService: CurrencyService, public modalService: ModalService) { }

  showCurrencyChart(): void {
    if (this.currencyChart === undefined) return;
    this.currencyChart.data = this.shownCurrency;
    this.currencyChart.render();
    this.error = '';
  }

  closeCurrencyChart(): void {
    this.renderCurrencyChart = false;
  }

  findCurrency(): void {
    const name = (document.querySelector('#currencyNameField') as HTMLInputElement).value.toLowerCase();
    const self = this;
    this.currencyService.getCurrency(name).subscribe(data => {
      self.shownCurrency = Currency.fromJson(name, data);
      self.renderCurrencyChart = true;
      if (self.onChartRendered.isUnboxed()) {
        this.showCurrencyChart();
      }
    }, error => {
      console.log('Currency not found.');
      self.error = 'Currency not found';
    });
  }
}
