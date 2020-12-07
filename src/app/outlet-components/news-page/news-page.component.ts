import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, group, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(200px)' }),
        group([
          animate('300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({ opacity: 1 })),
          animate('800ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({ transform: 'translateY(0)' })),
        ])
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class NewsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
