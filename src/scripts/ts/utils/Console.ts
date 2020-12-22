import {isDevMode} from "@angular/core";

export default class Console {
  public static printIfDev(msg: any) {
    if (isDevMode()) {
      console.log(msg);
    }
  }
}
