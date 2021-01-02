import {AfterContentInit, Component, isDevMode, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../../../services/user.service";
import StringUtils from "../../../../../scripts/ts/utils/StringUtils";
import {UserInfo} from "../../../../../scripts/ts/metadata/User";
import LocalUser from "../../../../../scripts/ts/utils/LocalUser";
import {defaultLongDateFormat} from "ngx-bootstrap/chronos/locale/locale.class";
import {ModalService} from "../../../../services/modal.service";
import {Route, Router} from "@angular/router";

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
export class AccountHomePageComponent implements OnInit, AfterContentInit {
  public ownedCoins: Array<{coin: string, amount: string}> = [];
  public initComplete = false;
  public user: UserInfo;

  constructor(public userService: UserService, private modalService: ModalService, private router: Router) { }

  getNicknameInitials(): string {
    return StringUtils.getInitials(this.user.username).toUpperCase();
  }

  public get changeType(): string {
    return localStorage.getItem('changeAttribute');
  }

  getStatus(): string {
    return this.user.status != null && this.user.status.length > 0 ? this.user.status : "This user has no status";
  }

  getEncryptedPassword(): string {
    return "*".repeat(10);
  }

  ngOnInit(): void {
    this.user = LocalUser.user;
    document.querySelector('.change-wrapper').addEventListener('click', () => {
      this.modalService.showModal('change-attr-modal');
      localStorage.setItem('changeAttribute', 'status');
    });
    if (localStorage.getItem('changeAttribute') === undefined) {
      localStorage.setItem('changeAttribute', 'username');
    }
    const self = this;
    if (!isDevMode()) {
      for (let elem of (this.user.ownedCoins as unknown as Array<any>)) {
        for (let [key, value] of Object.entries(elem)) {
          self.ownedCoins.push({coin: key.toString(), amount: value.toString()})
        }
      }
    } else {
      for (const [key, value] of Object.entries(this.user.ownedCoins)) {
        self.ownedCoins.push({coin: key, amount: value});
      }
    }
    this.initComplete = true;
  }

  ngAfterContentInit(): void {
    if (!LocalUser.loggedIn()) {
      this.router.navigate(['../../'])
    }
  }

}
