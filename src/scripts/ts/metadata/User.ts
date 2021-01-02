export interface UserInfo {
  id: number;
  username: string;
  email: string;
  status: string;
  cash: string;
  role: string;
  ownedCoins: { [coinId: string]: string };
}

export class User {
  public nickname: string;
  public id: number;
  public email: string;
  public status: string;
  public cash: string;
  public role: string;
  public ownedCoins: { [id: string]: string };

  public static readonly defaultUserInfo: UserInfo = {
    id: 0,
    username: 'Auferok',
    email: 'auf@auf.com',
    status: 'Some cool status',
    cash: '12412441000099.12401401204142',
    role: "USER",
    ownedCoins: {
      'bitcoin':'10000'
    }
  }

  constructor(id: number, data: UserInfo) {
    this.id = id;
    this.nickname = data.username;
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
