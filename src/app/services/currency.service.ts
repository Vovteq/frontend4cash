import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import URLRouter from "../../scripts/ts/utils/URLRouter";
import {error} from "@angular/compiler/src/util";
import {CurrencyPrice} from "../../scripts/ts/metadata/Currency";
import LocalUser from "../../scripts/ts/utils/LocalUser";

@Injectable()
export class CurrencyService {
  private readonly currenciesUrl: string;

  public globalCurrency: string = "USD";

  constructor(private http: HttpClient) {
    this.currenciesUrl = URLRouter.getRoute('currency');
  }

  public getCurrency(id: string): Observable<CurrencyPrice> {
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

  public addCurrency(amount: number, currency: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.put(this.currenciesUrl + `${currency}/buy?amount=${amount}&userId=${LocalUser.user.id}`, {},
        {
          headers: new HttpHeaders({
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          })
        }
      ).subscribe(() => {
        resolve();
      }, error1 => { reject(); });
    });

  }

  public getAllCurrencies(): Observable<any> {
    return this.http.get<any>(this.currenciesUrl);
  }
}
