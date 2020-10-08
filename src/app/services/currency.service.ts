import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Currency from "../../scripts/ts/currency/Currency";

@Injectable()
export class CurrencyService {
  private readonly currenciesUrl: string;

  private readonly prodUrl = 'http://backend4cash_prod:8069/api/coins/gleb';
  private readonly devUrl = 'http://172.21.0.2:8069/api/coins/gleb';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.currenciesUrl = this.devUrl;
    } else {
      this.currenciesUrl = this.prodUrl;
    }
  }

  public getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<any>(this.currenciesUrl);
  }

  public saveCurrency(currency: Currency): void {
    this.http.post<Currency>(this.currenciesUrl, currency);
  }
}
