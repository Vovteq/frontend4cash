export interface UserInfo {
  id: string;
  nickname: string;
  email: string;
  password: string;
}

export class User {
  public nickname: string;
  public id: string;
  public password: string;
  public email: string;

  constructor(id: string, data: UserInfo) {
    this.id = id;
    this.nickname = data.nickname;
    this.password = data.password;
    this.email = data.email;
  }

  public static formJson(id: string, json: any): User {
    return
  }
}
