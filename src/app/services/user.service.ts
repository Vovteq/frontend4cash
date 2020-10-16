import { Injectable } from '@angular/core';
import {UserInfo} from "../../scripts/ts/metadata/User";
import LocalUser from "../../scripts/ts/utils/LocalUser";

@Injectable()
export class UserService {

  constructor() { }

  public isLoggedIn(): boolean {
    return LocalUser.loggedIn();
  }

  public logIn(user: UserInfo) {
    LocalUser.logIn(user);
  }

  public getLocalUser(): UserInfo {
    return LocalUser.user;
  }
}
