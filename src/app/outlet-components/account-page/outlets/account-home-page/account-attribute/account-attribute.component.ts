import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-account-attribute',
  templateUrl: './account-attribute.component.html',
  styleUrls: ['./account-attribute.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountAttributeComponent implements OnInit {
  @Input() public label: string;
  @Input() editable: boolean;
  @Input() public value: any;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    console.log("Label: " + this.label);
    console.log("Val: " + this.value);

    (this.el.nativeElement as HTMLElement).querySelector('.attribute-name').innerHTML = this.label + '<button>Change</button>';
    (this.el.nativeElement as HTMLElement).querySelector('.attribute-value').innerHTML = this.value;
  }

}
