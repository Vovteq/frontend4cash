import { Component } from '@angular/core';
import {ButtonService} from "./services/button.service";
import {ModalService} from "./services/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend4cash';

  constructor(public modalService: ModalService) {}
}
