import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class CurrencyService {
  private readonly currenciesUrl: string;

  public globalCurrency: string = "USD";

  constructor(private http: HttpClient) {
    this.currenciesUrl = 'http://backend4cashdev:8080/api/coins/'
  }

  public getCurrency(id: string): Observable<any> {
    const url = this.currenciesUrl + id + "/pricedata";
    console.log("requesting data on address: " + url);
    return this.http.get<any>(url);
  }

  public getAllCurrencies(): Observable<any> {
    return this.http.get<any>(this.currenciesUrl);
  }
}
