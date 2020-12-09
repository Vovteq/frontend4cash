import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {CurrencyService} from "./currency.service";

export enum ExchangeError {
  UserNotFound,
  NotEnoughResources
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private userService: UserService, private currencyService: CurrencyService) { }

  public buyCurrency(): Promise<void> {
    const user = this.userService.getLocalUser();
    return new Promise<void>(((resolve, reject) => {
      if (user === undefined) {
        reject(ExchangeError.UserNotFound);
      } else {

      }
    }));
  }
}
