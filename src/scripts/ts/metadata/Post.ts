import {UserInfo} from "./User";

export interface PostInfo {
  content: string;
  authorName: string;
  title: string;
  id: number;
}

export class Post {
  public id: number;
  public message: string;
  public user: string;
  public title: string;

  constructor(id: number, data: PostInfo) {
    this.id = data.id;
    this.message = data.content;
    this.user = data.authorName;
    this.title = data.title;
  }
}
