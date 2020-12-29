import {User, UserInfo} from "../metadata/User";
import {Observable} from "rxjs";
import {UserService} from "../../../app/services/user.service";
import {Delegate} from "../delegates/Delegate";
import {Local} from "protractor/built/driverProviders";

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
    return LocalUser._user !== undefined;
  }

  public static get user(): UserInfo {
    console.log(LocalUser._user);
    return LocalUser._user;
  }

  public static logOut() {
    LocalUser._user = undefined;
  }

  public static forceLogIn(user: UserInfo) {
    LocalUser._user = user;
  }
}
