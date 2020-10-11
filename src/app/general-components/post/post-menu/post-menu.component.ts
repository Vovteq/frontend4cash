import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
