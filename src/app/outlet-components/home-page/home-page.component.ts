import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalService} from "../../services/modal.service";
import * as AOS from 'aos';
import DOMParser from "../../../scripts/ts/utils/DOMParser";
import PageCache from "../../../scripts/ts/utils/PageCache";

declare var particlesJS: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  cache: PageCache;

  constructor(public userService: UserService, public modalService: ModalService) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/config/particles.json');
    AOS.init();
    DOMParser.parse();
    this.cache = new PageCache();
  }
}
