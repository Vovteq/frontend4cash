import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post, PostInfo} from "../../scripts/ts/metadata/Post";
import {UserService} from "./user.service";
import URLRouter from "../../scripts/ts/utils/URLRouter";

@Injectable()
export class PostService {
  private readonly postsUrl: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.postsUrl = URLRouter.getRoute('posts');
  }

  public getPost(id: string): Observable<any> {
    const url = this.postsUrl + id;
    console.log("requesting post on address: " + url);
    return this.http.get<any>(url);
  }

  public getNPosts(amount: number): Observable<PostInfo[]> {
    return this.http.get<PostInfo[]>(`${this.postsUrl}?amount=${amount}`);
  }

  public getAllPosts(): Observable<any> {
    return this.http.get<any>(this.postsUrl);
  }

  public savePost(post: Post): Observable<any> {
    return this.http.post<any>(this.postsUrl, {message: post.message, user: this.userService.getLocalUser().id});
  }
}
