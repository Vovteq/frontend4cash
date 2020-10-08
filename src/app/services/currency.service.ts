import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Currency from "../../scripts/ts/currency/Currency";

@Injectable()
export class CurrencyService {
  private readonly currenciesUrl: string;
  # komit
  constructor(private http: HttpClient) {
    this.currenciesUrl = 'http://backend4cash_dev:8080/api/coins/gleb'
  }

  public getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.currenciesUrl);
  }

  public saveCurrency(currency: Currency): void {
    this.http.post<Currency>(this.currenciesUrl, currency);
  }
}
