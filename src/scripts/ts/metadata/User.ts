export interface UserInfo {
  id: string;
  username: string;
  email: string;
  password: string;
  status: string;
  cash: string;
  role: string;
  ownedCoins: { [id: string]: string };
}

export class User {
  public nickname: string;
  public id: string;
  public password: string;
  public email: string;
  public status: string;
  public cash: string;
  public role: string;
  public ownedCoins: { [id: string]: string };

  public static readonly defaultUserInfo: UserInfo = {
    id: '0',
    username: 'Auferok',
    email: 'auf@auf.com',
    password: '12345lol',
    status: 'Some cool status',
    cash: '100',
    role: "USER",
    ownedCoins: {}
  }

  constructor(id: string, data: UserInfo) {
    this.id = id;
    this.nickname = data.username;
    this.password = data.password;
    this.email = data.email;
    this.status = data.status;
    this.cash = data.cash;
    this.role = data.role;
    this.ownedCoins = data.ownedCoins;
  }

  public static formJson(id: string, json: any): User {
    return
  }
}
