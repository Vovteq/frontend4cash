import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalService} from "../../services/modal.service";
import * as AOS from 'aos';
import DOMParser from "../../../scripts/ts/utils/DOMParser";
import PageCache from "../../../scripts/ts/utils/PageCache";
import {animate, style, transition, trigger} from "@angular/animations";
import {ConnectionService} from "../../services/connection.service";
import {Router} from "@angular/router";

declare var particlesJS: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('showAbout', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(200px) scale(1.1)' }),
        animate('500ms cubic-bezier(0.645, 0.045, 0.355, 1.000)', style({ opacity: 1, transform: 'translateY(40px) scale(1.1)' })),
        animate('700ms cubic-bezier(0.680, -0.550, 0.460, 0.995)', style({ transform: 'translateY(0) scale(1)' })),
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  cache: PageCache;

  constructor(public userService: UserService, public modalService: ModalService, public connectionService: ConnectionService, public router: Router) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/config/particles.json');
    AOS.init();
    DOMParser.parse();
    this.cache = new PageCache();
    document.querySelector('#forumButton').addEventListener('click', () => {
      this.goToPage('forum');
    });
    document.querySelector('#newsButton').addEventListener('click', () => {
      this.goToPage('news');
    });
  }

  public goToPage(page: string): void {
    this.router.navigate([page]);
  }
}
