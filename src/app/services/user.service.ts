import {Injectable, isDevMode} from '@angular/core';
import {User, UserInfo} from "../../scripts/ts/metadata/User";
import LocalUser from "../../scripts/ts/utils/LocalUser";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import URLRouter from "../../scripts/ts/utils/URLRouter";
import Console from "../../scripts/ts/utils/Console";
import {Local} from "protractor/built/driverProviders";
import {catchError} from "rxjs/operators";

export enum LoginError {
  NoSuchUser,
  InvalidPassword,
  EmptyFields,
  UndefinedError
}

export enum RegisterError {
  UserAlreadyExists,
  EmptyFields,
  UndefinedError
}

export interface LoginResponse {
  email: string,
  token: string,
  role: string
}

@Injectable()
export class UserService {
  private readonly usersUrl;

  private fictional: UserInfo = { nickname: "meme", email: "kek@kek.ee", password: "123", status: "My super status", cash: "0", ownedCoins: {}, id: "0"};

  constructor(private http: HttpClient) {
    this.usersUrl = URLRouter.getRoute('users');
  }

  public isLoggedIn(): boolean {
    return LocalUser.loggedIn();
  }

  public logIn(email: string, password: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      if (email === null || password === null) {
        reject(LoginError.EmptyFields);
      }
      if (!isDevMode()) {
        console.log(`Login: url:[${this.usersUrl + "login"}], data: [${email}, ${password}]`)
        this.http.post(this.usersUrl + "login", {email: email, password: password}).subscribe((response: any) => {
          if (response.status === 201) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("lastLoggedInEmail", email);
            localStorage.setItem("lastLoggedInPassword", password);
            console.log(`Login success: id: [${response.id}], token: [${response.token}]`);

            this.getUser(response.id).subscribe((user) => {
              LocalUser.logIn(user);
              console.log(user);
              resolve();
            }, error => {
              reject(LoginError.UndefinedError)
              console.log()
            });
          } else {
            console.log(`Error during login POST, response below...`);
            console.log(response);
            reject(LoginError.UndefinedError);
          }
        });
      } else {
        LocalUser.logIn(this.fictional);
        resolve();
      }
    }));
  }

  public register(email: string, nickname: string, password: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      if (!isDevMode()) {
        this.http.post(this.usersUrl + "register", {username: nickname, email: email, password: password}).subscribe((response: any) => {
          if (response.status === 201) {
            resolve();
          } else {
            reject();
          }
        });
      } else {
        LocalUser.logIn(this.fictional);
        resolve();
      }
    }));
  }

  public logOut() {
    localStorage.removeItem('lastLoggedInEmail');
    localStorage.removeItem('lastLoggedInPassword');
    localStorage.removeItem('token');
    LocalUser.logOut();
  }

  public getLocalUser(): UserInfo {
    return LocalUser.user;
  }

  public getUser(id: string): Observable<UserInfo> {
    const self = this;
    return self.http.get<UserInfo>(`${self.usersUrl}${id}`, {
      headers: new HttpHeaders({
        "Authorization": "Token " + localStorage.getItem("token")
      })
    });
  }
}
