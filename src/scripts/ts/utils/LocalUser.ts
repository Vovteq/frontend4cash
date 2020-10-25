import {User, UserInfo} from "../metadata/User";
import {Observable} from "rxjs";
import {UserService} from "../../../app/services/user.service";

export default class LocalUser {
  private static _user: UserInfo;

  public static logIn(userId: string, service: UserService): boolean {
    if (userId === null) return false;
    service.getUser(userId).subscribe(user => {this._user = user});
    return true;
  }

  public static loggedIn(): boolean {
    return this._user !== undefined;
  }

  public static get user(): UserInfo {
    return this._user;
  }

  public static logOut() {
    this._user = undefined;
  }

  public static forceLogIn(user: UserInfo) {
    this._user = user;
  }
}
