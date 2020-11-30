import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import URLRouter from "../../scripts/ts/utils/URLRouter";
import {error} from "@angular/compiler/src/util";

@Injectable()
export class CurrencyService {
  private readonly currenciesUrl: string;

  public globalCurrency: string = "USD";

  constructor(private http: HttpClient) {
    this.currenciesUrl = URLRouter.getRoute('currency');
  }

  public getCurrency(id: string): Observable<any> {
    const url = this.currenciesUrl + id + "/pricedata";
    if (isDevMode()) {
      console.log("requesting data on address: " + url);
    }
    let obs = this.http.get<any>(url);
    if (isDevMode()) {
      obs.subscribe(error => {
        console.warn('Minor error caught during currency GET method');
      });
    }

    return obs;
  }

  public getAllCurrencies(): Observable<any> {
    return this.http.get<any>(this.currenciesUrl);
  }
}
