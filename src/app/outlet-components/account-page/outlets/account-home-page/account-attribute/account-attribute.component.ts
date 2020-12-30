import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-account-attribute',
  templateUrl: './account-attribute.component.html',
  styleUrls: ['./account-attribute.component.scss']
})
export class AccountAttributeComponent implements OnInit {
  @Input() public label: string;
  @Input() editable: boolean;
  @Input() public value: any;

  constructor() { }

  ngOnInit(): void {
    console.log("Label: " + this.label);
    console.log("Val: " + this.value);
  }

}
