import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
