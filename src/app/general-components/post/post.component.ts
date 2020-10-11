import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PostService} from "../../services/post.service";
import {UserInfo} from "../../../scripts/ts/metadata/User";
import {Post} from "../../../scripts/ts/metadata/Post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  public title: string;
  public user: UserInfo;
  public message: string;
  public id: string;

  @Input() requestData: boolean;
  @Input() postId: string;

  private data: Post;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    if(this.requestData) {
      this.postService.getPost(this.postId).subscribe(data => {
        this.data = data;
        this.populateWithInfo();
      });
    } else {
      this.setDefault();
      this.populateWithInfo();
    }
  }

  private populateWithInfo(): void {
    this.id = this.data.id;
    this.user = this.data.user;
    this.message = this.data.message;
    this.title = `#${this.id}`
  }

  setDefault(): void {
    this.data = new Post('-1', {message: 'Post message', user: {nickname: 'user'}})
  }
}
