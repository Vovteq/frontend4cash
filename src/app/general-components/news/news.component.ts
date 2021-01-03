import {Component, Input, OnInit} from '@angular/core';
import StringUtils from "../../../scripts/ts/utils/StringUtils";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [
    trigger('news', [
      state('appearing', style({opacity: 0, transform: 'scale(0)'})),
      state('active', style({opacity: 1, transform: 'scale(1)'})),
      transition('* => appearing', animate('0ms')),
      transition('appearing => active', animate('400ms cubic-bezier(0.175, 0.885, 0.320, 1.275)'))
    ])
  ]
})
export class NewsComponent implements OnInit {
  @Input() title: string;
  @Input() preview: string;
  @Input() hot: boolean;

  private initializing: boolean = true;

  public get state() {
    if (this.initializing) {
      return 'appearing';
    }
    return 'active';
  }

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializing = false;
    }, 1);
    this.title = StringUtils.capitalize(this.title);
  }

}
