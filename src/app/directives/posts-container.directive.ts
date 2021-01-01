import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPostsContainer]'
})
export class PostsContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
