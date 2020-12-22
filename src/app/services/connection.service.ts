import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, interval, of} from "rxjs";
import URLRouter from "../../scripts/ts/utils/URLRouter";
import {catchError, first} from "rxjs/operators";
import Console from "../../scripts/ts/utils/Console";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private _connected: boolean = true;
  private source = interval(3000);

  public get connected(): boolean {
    return this._connected;
  }

  constructor(private http: HttpClient) {
    this.source.subscribe(() => {
      Console.printIfDev("Server ping...")
      this.http.get(URLRouter.connectionUrl, {observe: 'response'})
        .pipe(first(), catchError(err => of(err)))
        .subscribe(response => {
          //@ts-ignore
          this._connected = response.status === 200;
          Console.printIfDev("Server ping success:" + this.connected);
        }, error => {
          this._connected = false;
          Console.printIfDev("Server ping failed.")
          Console.printIfDev(error);
        });
    }, error => {console.log(error);});
  }

  public forceDisconnect() {
    this._connected = false;
  }

  public forceCheck(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.get(URLRouter.baseUrl, { observe: 'response' })
        .pipe(first())
        .subscribe(response => {
          resolve(response.status === 200);
        });
    });
  }
}
