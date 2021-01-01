import {Injectable, isDevMode} from '@angular/core';
import {User, UserInfo} from "../../scripts/ts/metadata/User";
import LocalUser from "../../scripts/ts/utils/LocalUser";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import URLRouter from "../../scripts/ts/utils/URLRouter";
import StringUtils from "../../scripts/ts/utils/StringUtils";

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

  constructor(private http: HttpClient) {
    this.usersUrl = URLRouter.publicApiUrl + "api/users/";
  }

  public isLoggedIn(): boolean {
    return LocalUser.loggedIn();
  }

  public logIn(email: string, password: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      if (email === null || password === null) {
        reject(LoginError.EmptyFields);
      }
      this.http.post(this.usersUrl + "login", {email: StringUtils.stripTags(email), password: password}).subscribe((response : any) => {
        if (response !== null && response.success === true && response.token != null) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("lastLoggedInEmail", StringUtils.stripTags(email));
          localStorage.setItem("lastLoggedInPassword", password);

          this.getUser(response.id).subscribe((user) => {
            LocalUser.logIn(user);
            resolve();
          }, error => {
            reject(LoginError.UndefinedError)
          });
        } else {
          reject(LoginError.UndefinedError);
        }
      }, error => {reject(LoginError.UndefinedError)});
    }));
  }

  public register(email: string, nickname: string, password: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.http.post(this.usersUrl + "register", {username: StringUtils.stripTags(nickname), email: StringUtils.stripTags(email), password: password}).subscribe((response: any) => {
        if (response != null && response.success === true) {
          resolve();
        } else {
          reject();
        }
      }, error => { reject();});
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

  public addCash(amount: number): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.http.put(this.usersUrl + LocalUser.user.id + `/bablo?amount=${amount.toString()}`, {}, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        })
      }).subscribe(() => {
        resolve();
      }, error => reject());
    }));
  }

  public updateUserData() {
    this.getUser(LocalUser.user.id.toString()).subscribe((user) => {
      LocalUser.setUser(user);
    });
  }

  public changeAttribute(newValue: string, attribute: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.http.put(`${this.usersUrl}${LocalUser.user.id}/${attribute}?${attribute}=${StringUtils.stripTags(newValue)}`, {},
        {
          headers: new HttpHeaders({
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          })
        }
      ).subscribe(() => {
        if (attribute === 'email') {
          localStorage.setItem('lastLoggedInEmail', StringUtils.stripTags(newValue));
        }
        resolve();
      }, error => {reject();});
    }));
  }

  public getUser(id: string): Observable<UserInfo> {
    const self = this;
    return self.http.get<UserInfo>(`${self.usersUrl}${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    });
  }
}
