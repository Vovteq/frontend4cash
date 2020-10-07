import {
  Component,
  Input,
  AfterViewInit,
  Renderer2,
  ViewChildren,
  QueryList
} from '@angular/core';
import Chart from "../../scripts/ts/graphs/Chart";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @Input() options: Partial<any>;
  @ViewChildren('chartRenderer') private chartRenderer: QueryList<any>;
  chartObject: Chart;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const chart: HTMLElement = this.renderer.createElement('chart');
    this.renderer.appendChild(this.chartRenderer.first.nativeElement, chart);
    chart.classList.add('chart');
    this.chartObject = new Chart(chart, this.options);
    this.updateChart();
  }

  updateChart() {
    this.chartObject.render();
  }

}
