import {Component, isDevMode, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "./services/user.service";
import LocalUser from "../scripts/ts/utils/LocalUser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'frontend4cash';
  public showLoading: boolean = false;
  public initComplete: boolean = false;

  constructor(public userService: UserService) {
  }

  public get loggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  ngOnInit(): void {
    const self = this;
    LocalUser.onLogIn.add(([user]) => {
      if (isDevMode()) {
        console.log(self.userService.isLoggedIn());
        console.log(user);
      }
    });
    LocalUser.onLogTry.add(([success]) => {
      self.initComplete = true;
    });
    const lastId = localStorage.getItem('lastRegistered');
    this.userService.logIn(lastId);
  }

  renderTip(): boolean {
    return !this.userService.isLoggedIn();
  }

  init(): void {
  }

  scroll(elem: Element): void {
    elem.scrollIntoView();
  }
}
