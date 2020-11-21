import {Dictionary} from "../data-handling/Dictionary";
import {isDevMode} from "@angular/core";

export default class URLRouter {
  private static baseUrl = "http://localhost:8069/"

  private static routes: {[id: string]: string} = {
    currency: 'api/coins/',
    users: 'api/users/',
    posts: 'api/posts/'
  }

  public static getRoute(routeId: string): string {
    return isDevMode() ? URLRouter.baseUrl + URLRouter.routes[routeId] : URLRouter.routes[routeId];
  }
}
