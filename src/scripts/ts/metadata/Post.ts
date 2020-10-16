import {UserInfo} from "./User";

export interface PostInfo {
  message: string;
  user: UserInfo;
}

export class Post {
  public id: string;
  public message: string;
  public user: UserInfo;

  constructor(id: string, data: PostInfo) {
    this.id = id;
    this.message = data.message;
    this.user = data.user;
  }

  public static fromJson(id: string, json: any): Post {
    return new Post(id, json);
  }
}
