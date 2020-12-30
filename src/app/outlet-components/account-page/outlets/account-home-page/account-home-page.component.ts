import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../../../services/user.service";
import StringUtils from "../../../../../scripts/ts/utils/StringUtils";
import {UserInfo} from "../../../../../scripts/ts/metadata/User";
import LocalUser from "../../../../../scripts/ts/utils/LocalUser";
import {defaultLongDateFormat} from "ngx-bootstrap/chronos/locale/locale.class";

@Component({
  selector: 'app-account-home-page',
  templateUrl: './account-home-page.component.html',
  styleUrls: ['./account-home-page.component.scss'],
  animations: [
    trigger('showHideHeader', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px) scale(1.1)' }),
        animate('500ms cubic-bezier(0.645, 0.045, 0.355, 1.000)', style({ opacity: 1, transform: 'translateY(-40px) scale(1.1)' })),
        animate('1000ms cubic-bezier(0.645, 0.045, 0.355, 1.000)', style({ transform: 'translateY(0) scale(1)' })),
      ])
    ])
  ]
})
export class AccountHomePageComponent implements OnInit {
  public ownedCoins: Array<string> = [];
  public initComplete = false;
  public user: UserInfo;

  constructor(public userService: UserService) { }

  getNicknameInitials(): string {
    return StringUtils.getInitials(this.user.username).toUpperCase();
  }

  getStatus(): string {
    return this.user.status != null && this.user.status.length > 0 ? this.user.status : "This user has no status";
  }

  getEncryptedPassword(): string {
    return "*".repeat(10);
  }

  ngOnInit(): void {
    this.user = LocalUser.user;
    const self = this;
    Object.keys(this.user.ownedCoins).forEach((key) => {
      console.log("Key: " + key);
      self.ownedCoins.push(key);
    });
    console.log("Owned: " + this.ownedCoins);
    this.initComplete = true;
  }

}
