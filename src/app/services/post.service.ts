import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../scripts/ts/metadata/Post";

@Injectable()
export class PostService {
  private readonly postsUrl: string;

  constructor(private http: HttpClient) {
    this.postsUrl = 'http://localhost:8069/api/posts/'
  }

  public getPost(id: string): Observable<any> {
    const url = this.postsUrl + id;
    console.log("requesting post on address: " + url);
    return this.http.get<any>(url);
  }

  public getAllPosts(): Observable<any> {
    return this.http.get<any>(this.postsUrl);
  }

  public savePost(post: Post): Observable<any> {
    return this.http.post<Post>(this.postsUrl, post);
  }
}
