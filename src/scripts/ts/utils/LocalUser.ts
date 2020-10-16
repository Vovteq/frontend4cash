import {UserInfo} from "../metadata/User";

export default class LocalUser {
  private static _user: UserInfo;

  public static logIn(user: UserInfo): void {
    this._user = user;
  }

  public static loggedIn(): boolean {
    return this._user !== undefined;
  }

  public static get user(): UserInfo {
    return this._user;
  }
}
