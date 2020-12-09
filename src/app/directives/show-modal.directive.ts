import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {ModalService} from "../services/modal.service";
import ParametersTuple from "../../scripts/ts/utils/ParametersTuple";
import {ModalComponent} from "../general-components/modal/modal.component";

@Directive({
  selector: '[appShowModal]'
})
// Shows modal on hover.
export class ShowModalDirective implements AfterViewInit{
  // <b>1</b> - modal id [<b>string</b>] <br>
  // <b>2</b> - hide on leave [<b>boolean</b>] <br>
  // <b>3</b> - stick modal to element <i>(! Make modal child of this element !)</i> [<b>boolean</b>] <br>
  @Input() params: ParametersTuple<[string, boolean, boolean]>;

  private modal: ModalComponent;

  constructor(private el: ElementRef, private modalService: ModalService) { }

  ngAfterViewInit(): void {
    this.modal = this.modalService.getModal(this.params[0]);
    if (this.params[2]) {
      this.el.nativeElement.style.position = 'relative';
    }
  }

  @HostListener('mouseenter') show(): void {
    this.modal.show();
  }

  @HostListener('mouseleave') hide(): void {
    if (this.params[1]) {
      this.modal.hide();
    }
  }
}
