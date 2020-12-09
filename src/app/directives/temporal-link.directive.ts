import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {Delegate, Func} from "../../scripts/ts/delegates/Delegate";
import {LinkComponent} from "../general-components/link/link.component";

@Directive({
  selector: 'app-link[appTemporalLink]'
})
export class TemporalLinkDirective implements AfterViewInit{
  @Input() condition: (args: any) => boolean;

  constructor(private host: LinkComponent) {}

  ngAfterViewInit(): void {
    this.host.changeColor("#2a9d58");
  }
}
