import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-account-attribute',
  templateUrl: './account-attribute.component.html',
  styleUrls: ['./account-attribute.component.scss']
})
export class AccountAttributeComponent implements OnInit {
  @Input() label: string;
  @Input() editable: boolean;
  @Input() value: any;

  constructor() { }

  ngOnInit(): void {
  }

}
