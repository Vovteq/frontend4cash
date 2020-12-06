import {Injectable} from '@angular/core';
import {User, UserInfo} from "../../scripts/ts/metadata/User";
import LocalUser from "../../scripts/ts/utils/LocalUser";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import URLRouter from "../../scripts/ts/utils/URLRouter";

export enum LoginError {
  NoSuchUser,
  InvalidPassword,
  EmptyFields
}

@Injectable()
export class UserService {
  private readonly usersUrl;


  constructor(private http: HttpClient) {
    this.usersUrl = URLRouter.getRoute('users');
  }

  public isLoggedIn(): boolean {
    return LocalUser.loggedIn();
  }

  public logIn(id: string) {
    LocalUser.logIn(id, this);
  }

  private forceLogIn(user: UserInfo) {
    LocalUser.forceLogIn(user);
  }

  public logInAlias(alias: string, password: string): Promise<void> {
    let user: UserInfo;
    return new Promise<void>((resolve, reject) => {
      this.getAllUsers().subscribe(users => {
        if (alias.length == 0 || password.length == 0) {
          reject(LoginError.EmptyFields);
        }
        try {
          user = users.filter(u => u.email === alias || u.nickname === alias)[0];
        } catch (e) {
          user = undefined;
        }
        if (user !== undefined) {
          if (user.password == password) {
            this.forceLogIn(user);
            localStorage.setItem('lastRegistered', user.id);
            resolve();
          } else {
            reject(LoginError.InvalidPassword);
          }
        } else { reject(LoginError.NoSuchUser); }
      });
    });
  }

  public registerUser(id: string) {
    console.log(`registered user${id} to localstorage`);
    localStorage.setItem('lastRegistered', id);
  }

  public logOut() {
    localStorage.removeItem('lastRegistered');
    LocalUser.logOut();
  }

  public getLocalUser(): UserInfo {
    return LocalUser.user;
  }

  public getUser(id: string): Observable<UserInfo> {
    const self = this;
    return self.http.get<UserInfo>(`${self.usersUrl}${id}`);
  }

  public getAllUsers(): Observable<UserInfo[]> {
    const self = this;
    return self.http.get<UserInfo[]>(this.usersUrl);
  }

  public saveUser(user: User): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }
}
