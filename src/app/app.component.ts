import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "./services/user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'frontend4cash';
  public showLoading: boolean = false;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    const lastId = localStorage.getItem('lastRegistered');
    if (lastId !== null) {
      this.userService.logIn(lastId);
    }
  }

  init(): void {
  }

  scroll(elem: Element): void {
    elem.scrollIntoView();
  }
}
