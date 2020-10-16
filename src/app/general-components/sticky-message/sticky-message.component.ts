import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-sticky-message',
  templateUrl: './sticky-message.component.html',
  styleUrls: ['./sticky-message.component.scss']
})
export class StickyMessageComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {

  }

}
