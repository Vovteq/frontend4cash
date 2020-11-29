import {User, UserInfo} from "../metadata/User";
import {Observable} from "rxjs";
import {UserService} from "../../../app/services/user.service";
import {Delegate} from "../delegates/Delegate";

export default class LocalUser {
  public static onLogIn: Delegate<[UserInfo]> = new Delegate<[UserInfo]>();
  public static onLogTry: Delegate<[boolean]> = new Delegate<[boolean]>();

  private static _user: UserInfo;

  public static logIn(userId: string, service: UserService): boolean {
    if (userId === null) {
      this.onLogTry.invoke([false]);
      return false;
    }
    service.getUser(userId).subscribe(user => {
      LocalUser._user = user;
      LocalUser.onLogIn.invoke([LocalUser._user]);
      LocalUser.onLogTry.invoke([true]);
    });
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
