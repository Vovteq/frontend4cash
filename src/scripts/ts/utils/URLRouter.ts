import {Dictionary} from "../data-handling/Dictionary";
import {isDevMode} from "@angular/core";

export default class URLRouter {
  public static readonly baseUrl = "";
  public static readonly publicApiUrl = "https://bits4cash.tk/";
  public static readonly connectionUrl = URLRouter.baseUrl + "api/coins";

  private static routes: {[id: string]: string} = {
    currency: 'api/coins/',
    users: 'api/users/',
    posts: 'api/posts/',
    news: 'api/news/'
  }

  public static getRoute(routeId: string): string {
    return isDevMode() ? URLRouter.baseUrl + URLRouter.routes[routeId] : URLRouter.routes[routeId];
  }
}
