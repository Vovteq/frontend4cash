import {Component, Input, OnInit} from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
