import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Currency} from "../../../scripts/ts/metadata/Currency";
import {ModalService} from "../../services/modal.service";
import {ModalComponent} from "../../general-components/modal/modal.component";
import {ChartComponent} from "ng-apexcharts";
import {Delegate} from "../../../scripts/ts/delegates/Delegate";
import {ChartContainerComponent} from "../../general-components/chart-container/chart-container.component";
import {animate, group, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(200px)' }),
        group([
          animate('300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({ opacity: 1 })),
          animate('800ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({ transform: 'translateY(0)' })),
        ])
      ])
    ]),
    trigger('currencyChartAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.9)' }),
        animate('500ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('500ms cubic-bezier(0.600, -0.280, 0.735, 0.045)', style({ opacity: 0, transform: 'translateY(40px) scale(0.9)' })),
      ]),
    ]),
    trigger('errorAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)', textShadow: '0 0 15px rgba(255, 69, 69, 0)' }),
        animate('500ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({ opacity: 1, transform: 'scale(1)', textShadow: '10px 10px 30px rgba(199, 46, 46, 1)' })),
        animate('500ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({ textShadow: '0 0 15px rgba(255, 69, 69, 0.4)' }))
      ]),
      transition(':leave', [
        animate('500ms cubic-bezier(0.600, -0.280, 0.735, 0.045)', style({ opacity: 0, transform: 'scale(0.9)' }))
      ]),
    ])
  ]
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
