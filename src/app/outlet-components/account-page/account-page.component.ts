import {AfterContentInit, Component, OnInit} from '@angular/core';
import LocalUser from "../../../scripts/ts/utils/LocalUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit, AfterContentInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    if (!LocalUser.loggedIn()) {
      this.router.navigate(['../'])
    }
  }

}
