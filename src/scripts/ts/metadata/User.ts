export interface UserInfo {
  id: string;
  username: string;
  email: string;
  password: string;
  status: string;
  cash: string;
  ownedCoins: { [id: string]: string };
}

export class User {
  public nickname: string;
  public id: string;
  public password: string;
  public email: string;
  public status: string;
  public cash: string;
  public ownedCoins: { [id: string]: string };

  public static readonly defaultUserInfo: UserInfo = {
    id: '0',
    username: 'nickname',
    email: 'email',
    password: 'password',
    status: 'status',
    cash: 'cash',
    ownedCoins: {}
  }

  constructor(id: string, data: UserInfo) {
    this.id = id;
    this.nickname = data.username;
    this.password = data.password;
    this.email = data.email;
    this.status = data.status;
    this.cash = data.cash;
    this.ownedCoins = data.ownedCoins;
  }

  public static formJson(id: string, json: any): User {
    return
  }
}
