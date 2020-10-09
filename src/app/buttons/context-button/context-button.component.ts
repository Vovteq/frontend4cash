import {Component, Input, OnInit, Output} from '@angular/core';
import {Delegate} from "../../../scripts/ts/delegates/Delegate";

@Component({
  selector: 'app-context-button',
  templateUrl: './context-button.component.html',
  styleUrls: ['./context-button.component.scss']
})
export class ContextButtonComponent implements OnInit {

  @Input() clickCtx;

  public contexts: Delegate<Array<any>>;

  constructor() { }

  ngOnInit(): void {
  }

}
