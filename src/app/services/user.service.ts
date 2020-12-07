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

export enum RegisterError {
  UserAlreadyExists,
  EmptyFields,
  UndefinedError
}

@Injectable()
export class UserService {
  private readonly usersUrl;
  private readonly ID_OFFSET: number = 3;

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

  public registerUser(user: UserInfo) : Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (user.password.length == 0 || user.nickname.length == 0 || user.email.length == 0) {
        reject(RegisterError.EmptyFields);
      }
      let newId = 0;
      this.getAllUsers().subscribe(users => {
        newId = users.length + this.ID_OFFSET;
        user.id = newId.toString();
        this.getAllUsers(user.email).subscribe(users => {
          if (users.length > 0) {
            reject(RegisterError.UserAlreadyExists);
          }
          try {
            this.saveUser(user).subscribe(user => {
              this.getAllUsers(user.email).subscribe(users => {
                if (users.length == 0) {
                  reject(RegisterError.UndefinedError);
                }
                localStorage.setItem('lastRegistered', user.id);
                resolve(users[0].id);
              });
            });
          } catch (e) {
            reject(RegisterError.UndefinedError);
          }
        });
      });
    });
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
    return self.http.get<UserInfo>(`${self.usersUrl}/${id}`);
  }

  public getAllUsers(email = ""): Observable<UserInfo[]> {
    const self = this;
    if (email.length != 0) {
      return self.http.get<UserInfo[]>(this.usersUrl+"?email="+email);
    } else {
      return self.http.get<UserInfo[]>(this.usersUrl);
    }
  }

  public saveUser(user: UserInfo): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }
}
