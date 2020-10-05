import {Component, Input, OnInit} from '@angular/core';
import UrlClickContext from "../../scripts/ts/click-contexts/UrlClickContext";

type urlCtx = UrlClickContext;

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent implements OnInit {
  @Input() text: string;
  @Input() url: string;
  private clickCtx: urlCtx;

  constructor() { }

  ngOnInit(): void {
    this.clickCtx = new UrlClickContext(this.url);

  }

  changeUrl(url: string) {
    this.clickCtx.url = url;
  }

  handleOnClick() {
    this.clickCtx.invoke();
  }
}
