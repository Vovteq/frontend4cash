import {Injectable, isDevMode} from '@angular/core';
import {User, UserInfo} from "../../scripts/ts/metadata/User";
import LocalUser from "../../scripts/ts/utils/LocalUser";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import URLRouter from "../../scripts/ts/utils/URLRouter";

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
      console.log(`Login: url:[${this.usersUrl + "login"}], data: [${email}, ${password}]`)
      this.http.post(this.usersUrl + "login", {observe: "response", email: email, password: password}).subscribe((response : any) => {
        if (response !== null && response.success === true && response.token != null) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("lastLoggedInEmail", email);
          localStorage.setItem("lastLoggedInPassword", password);
          console.log(`Login success: id: [${response.id}], token: [${response.token}]`);
          console.log(`Status: ${response.status}`);

          this.getUser(response.id).subscribe((user) => {
            LocalUser.logIn(user);
            console.log(user);
            resolve();
          }, error => {
            console.log("Error during user data GET:");
            console.log(error);
            reject(LoginError.UndefinedError)
          });
        } else {
          console.log(`Error during login POST, response below...`);
          console.log(response);
          reject(LoginError.UndefinedError);
        }
      });
    }));
  }

  public register(email: string, nickname: string, password: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.http.post(this.usersUrl + "register", {username: nickname, email: email, password: password}).subscribe((response: any) => {
        if (response != null && response.success === true) {
          console.log("Register success");
          resolve();
        } else {
          console.log(response);
          reject();
        }
      });
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
      this.http.put(this.usersUrl + LocalUser.user.id + `/bablo?amount=${amount.toString()}`, {}).subscribe(() => {
        resolve();
      }, error => reject());
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
