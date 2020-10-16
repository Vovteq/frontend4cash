export interface UserInfo {
  nickname: string;
}

export class User {
  public nickname: string;
  public id: string;

  constructor(id: string, data: UserInfo) {
    this.id = id;
    this.nickname = data.nickname;
  }

  public static formJson(id: string, json: any): User {
    return
  }
}
