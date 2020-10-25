import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Property} from "csstype";
import {animate, style, transition, trigger} from "@angular/animations";
import Color = Property.Color;

@Component({
  selector: 'app-context-button',
  templateUrl: './context-button.component.html',
  styleUrls: ['./context-button.component.scss'],
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
  ],
  encapsulation: ViewEncapsulation.None
})
export class ContextButtonComponent implements OnInit {
  public shown: boolean = true;

  @Input() context: Function;
  @Input() args: any[];
  @Input() text: string;

  // Style
  @Input() color: Color;

  constructor() { }

  ngOnInit(): void {

  }

  handleOnClick(): void {
    this.context?.call(null, this.args);
  }

  show(): void {
    this.shown = true;
  }

  hide(): void {
    this.shown = false;
  }

}
