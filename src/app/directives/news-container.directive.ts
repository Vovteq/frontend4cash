import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appNewsContainer]'
})
export class NewsContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
