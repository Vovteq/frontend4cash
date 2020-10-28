import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from "./services/modal.service";
import {UserService} from "./services/user.service";
import {ActivationStart, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";
import {AccountGuard} from "./guards/account.guard";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'frontend4cash';

  constructor(public modalService: ModalService, public userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    const lastId = localStorage.getItem('lastRegistered');
    if (lastId !== null) {
      this.userService.logIn(lastId);
    }

    AccountGuard.onRouteResolved.add((route, active) => {
      if (!active) {
        this.router.navigateByUrl('/**');
      }
    })
  }

  init(): void {
  }

  scroll(elem: Element): void {
    elem.scrollIntoView();
  }
}
