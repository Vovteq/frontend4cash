import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from "../../../../../services/modal.service";

@Component({
  selector: 'app-account-attribute',
  templateUrl: './account-attribute.component.html',
  styleUrls: ['./account-attribute.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountAttributeComponent implements OnInit {
  @Input() label: string;
  @Input() editable: boolean;
  @Input() value: any;
  @Input() attribute: string;

  constructor(private el: ElementRef, private modalService: ModalService) { }

  ngOnInit(): void {

    (this.el.nativeElement as HTMLElement).querySelector('.attribute-name').innerHTML =
      this.editable ? this.label + '<button>Change</button>' : this.label;
    if (this.editable) {
      (this.el.nativeElement as HTMLElement).querySelector('.attribute-name').querySelector('button').addEventListener('click', () => {
        this.modalService.showModal('change-attr-modal');
        localStorage.setItem('changeAttribute', this.attribute);
      });
    }
    (this.el.nativeElement as HTMLElement).querySelector('.attribute-value').innerHTML = this.value;
  }

}
