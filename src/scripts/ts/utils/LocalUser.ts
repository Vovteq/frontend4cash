import {UserInfo} from "../metadata/User";

export default class LocalUser {
  private static user: UserInfo;

  public static logIn(user: UserInfo): void {
    this.user = user;
  }

  public static loggedIn(): boolean {
    return this.user !== null;
  }
}
