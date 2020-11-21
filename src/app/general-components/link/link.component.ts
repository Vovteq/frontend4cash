import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
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
