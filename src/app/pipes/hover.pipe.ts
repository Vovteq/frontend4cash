import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hover'
})
export class HoverPipe implements PipeTransform {

  transform(object: HTMLElement, enterCallback: Function, exitCallback: Function): void {
    object.addEventListener('mouseenter', () => {enterCallback();}, false);
    object.addEventListener('mouseleave', () => {exitCallback();}, false);
  }

}
