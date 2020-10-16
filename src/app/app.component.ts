import { Component, OnInit } from '@angular/core';
import {ButtonService} from "./services/button.service";
import {ModalService} from "./services/modal.service";
import * as AOS from 'aos';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend4cash';

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/config/particles.json');
    AOS.init();
  }


}
