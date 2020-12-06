import { Component, OnInit } from '@angular/core';
import {animate, group, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-exchange-page',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.scss'],
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
    trigger('showOption', [
      transition(':enter', [
        query('*', [
          style({ transform: 'scale(0)'}),
          stagger(300, [
            animate('200ms ease-in-out', style({ transform: 'scale(1)'}))
          ])
        ])
      ])
    ])
  ]
})
export class ExchangePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
