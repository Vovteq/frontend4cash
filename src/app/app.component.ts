import { Component, OnInit } from '@angular/core';
import {ModalService} from "./services/modal.service";
import * as AOS from 'aos';
import {UserService} from "./services/user.service";

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend4cash';

  constructor(public modalService: ModalService, public userService: UserService) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/config/particles.json');
    AOS.init();
    const lastId = localStorage.getItem('lastRegistered');
    if (lastId !== null) {
      this.userService.logIn(lastId);
    }
  }

  scroll(elem: Element): void {
    elem.scrollIntoView();
  }
}
