import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Currency from "../../scripts/ts/currency/Currency";

@Injectable()
export class CurrencyService {
  private readonly currenciesUrl: string;

  constructor(private http: HttpClient) {
    this.currenciesUrl = 'http://localhost:8069/api/coins/get_prices/'
  }

  public getAllCurrencies(): Observable<any> {
    return this.http.get<any>(this.currenciesUrl);
  }
}