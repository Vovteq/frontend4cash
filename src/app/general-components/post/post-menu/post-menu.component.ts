import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-post-menu',
  templateUrl: './post-menu.component.html',
  styleUrls: ['./post-menu.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('200ms ease-out', style({ opacity: 1, height: '38px'})),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, height: 0})),
      ]),
    ])
  ]
})
export class PostMenuComponent implements OnInit {
  public show: boolean;
  public opened: boolean;

  @Output() onOpenFull: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHideFull: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public openFull(): void {
    this.opened = true;
    this.onOpenFull.next();
  }

  public hideFull(): void {
    this.opened = false;
    this.onHideFull.next();
  }

}
