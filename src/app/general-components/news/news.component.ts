import {Component, Input, OnInit} from '@angular/core';
import StringUtils from "../../../scripts/ts/utils/StringUtils";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() title: string;
  @Input() preview: string;
  @Input() hot: boolean;

  constructor() { }

  ngOnInit(): void {
    this.title = StringUtils.capitalize(this.title);
  }

}
