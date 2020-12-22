import {Component, isDevMode, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "./services/user.service";
import LocalUser from "../scripts/ts/utils/LocalUser";
import {timer} from "rxjs";
import Console from "../scripts/ts/utils/Console";
import {ConnectionService} from "./services/connection.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public showLoading: boolean = false;
  public initComplete: boolean = false;

  private timeout = timer(2000);

  constructor(public userService: UserService, private connectionService: ConnectionService) {
  }

  public get loggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  ngOnInit(): void {
    const self = this;
    LocalUser.onLogIn.add(([user]) => {
      if (isDevMode()) {
        console.log(self.userService.isLoggedIn());
        console.log(`Owned coins: ${user.ownedCoins}`);
      }
    });
    LocalUser.onLogTry.add(([success]) => {
      self.initComplete = true;
    });
    const lastId = localStorage.getItem('lastRegistered');
    this.userService.logIn(lastId);
    this.timeout.subscribe(() => {
      if (!self.initComplete) {
        Console.printIfDev('Init complete with timeout');
        self.initComplete = true;
        self.connectionService.forceDisconnect();
      }
    });
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
