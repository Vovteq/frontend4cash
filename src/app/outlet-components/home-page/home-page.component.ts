import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalService} from "../../services/modal.service";
import * as AOS from 'aos';
import DOMParser from "../../../scripts/ts/utils/DOMParser";

declare var particlesJS: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  constructor(public userService: UserService, public modalService: ModalService) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/config/particles.json');
    AOS.init();
    DOMParser.parse();
  }

}
