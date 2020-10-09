import { Component } from '@angular/core';
import {ButtonService} from "./services/button.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend4cash';

  constructor(public buttonService: ButtonService) {}
}
