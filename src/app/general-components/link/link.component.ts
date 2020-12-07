import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.9)' }),
        animate('200ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.600, -0.280, 0.735, 0.045)', style({ opacity: 0, transform: 'translateY(40px) scale(0.9)' })),
      ]),
    ])
  ]
})
export class LinkComponent implements OnInit {
  @Input() routeLink: boolean;
  @Input() route: string;
  @Input() url: string;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
