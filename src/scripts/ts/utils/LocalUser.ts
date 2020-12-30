import {User, UserInfo} from "../metadata/User";
import {Observable} from "rxjs";
import {UserService} from "../../../app/services/user.service";
import {Delegate} from "../delegates/Delegate";
import {Local} from "protractor/built/driverProviders";
import {isDevMode} from "@angular/core";

export default class LocalUser {
  public static onLogIn: Delegate<[UserInfo]> = new Delegate<[UserInfo]>();
  public static onLogTry: Delegate<[boolean]> = new Delegate<[boolean]>();

  private static _user: UserInfo;

  public static logIn(user: UserInfo): boolean {
    if (user=== null) {
      this.onLogTry.invoke([false]);
      return false;
    }
    LocalUser._user = user;
    LocalUser.onLogIn.invoke([LocalUser._user]);
    LocalUser.onLogTry.invoke([true]);
    return true;
  }

  public static loggedIn(): boolean {
    return this.user !== undefined;
  }

  public static get user(): UserInfo {
    return isDevMode() ? User.defaultUserInfo : LocalUser._user;
  }

  public static logOut() {
    LocalUser._user = undefined;
  }

  public static setUser(user: UserInfo) {
    LocalUser._user = user;
  }
}
