import {Component, Input, OnInit, Output} from '@angular/core';
import {ButtonService} from "../../services/button.service";
import {Property} from "csstype";
import Color = Property.Color;
import {Style} from "@angular/cli/lib/config/schema";

@Component({
  selector: 'app-context-button',
  templateUrl: './context-button.component.html',
  styleUrls: ['./context-button.component.scss']
})
export class ContextButtonComponent implements OnInit {

  @Input() context: Function;
  @Input() args: any[];
  @Input() text: string;

  // Style
  @Input() color: Color;

  constructor(public buttonService: ButtonService) { }

  ngOnInit(): void {

  }

  handleOnClick(): void {
    this.context?.call(null, this.args);
  }

}
