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
    console.log(LocalUser._user);
    return true;
  }

  public static loggedIn(): boolean {
    return LocalUser.user !== undefined;
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

  public static isAdmin() {
    return LocalUser._user.role === 'ADMIN';
  }

  public static getOwnedCurrencyAmount(name: string): number {
    if (isDevMode()) {
      console.log("GET");
      if (LocalUser.user.ownedCoins[name.toLowerCase()] === undefined) {
        return undefined;
      }
      return parseFloat(LocalUser.user.ownedCoins[name.toLowerCase()]);
    } else {
      for (let elem of LocalUser.user.ownedCoins as unknown as Array<any>) {
        for (const [key, value] of Object.entries(elem)) {
          if (key.toLowerCase() === name.toLowerCase()) {
            return parseFloat(value as string);
          }
        }
      }
      return undefined;
    }
  }

  public static addOwnedCurrencyAmount(name: string, amount: number): void {
    if (isDevMode()) {
      console.log("ADD");
      console.log(LocalUser.user.ownedCoins[name.toLowerCase()]);
      LocalUser.user.ownedCoins[name.toLowerCase()] = (parseFloat(LocalUser.user.ownedCoins[name.toLowerCase()]) + amount).toString();
    } else {
      for (let elem of LocalUser.user.ownedCoins as unknown as Array<any>) {
        for (const [key, value] of Object.entries(elem)) {
          if (key.toLowerCase() === name.toLowerCase()) {
            elem[key] = (parseFloat(elem[key]) + amount).toString();
            return;
          }
        }
      }
    }
  }

  public static setOwnedCurrencyAmount(name: string, amount: number): void {
    if (isDevMode()) {
      LocalUser.user.ownedCoins[name.toLowerCase()] = amount.toString();
      console.log(LocalUser.user.ownedCoins);
    } else {
      let contains = false;
      for (let elem of LocalUser.user.ownedCoins as unknown as Array<any>) {
        if (contains) {
          break;
        }
        for (const [key, value] of Object.entries(elem)) {
          if (key === name) {
            contains = true;
            break;
          }
        }
      }
      if (contains) {
        for (let elem of LocalUser.user.ownedCoins as unknown as Array<any>) {
          for (let [key, value] of Object.entries(elem)) {
            if (key === name) {
              value = amount.toString();
              break;
            }
          }
        }
      } else {
        const str = amount.toString();
        (LocalUser.user.ownedCoins as unknown as Array<any>).push({name, str});
      }
    }
  }
}
