import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PostService} from "../../services/post.service";
import {User, UserInfo} from "../../../scripts/ts/metadata/User";
import {Post} from "../../../scripts/ts/metadata/Post";
import {PostMenuComponent} from "./post-menu/post-menu.component";
import {Delegate} from "../../../scripts/ts/delegates/Delegate";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  public _title: string;
  public _user: UserInfo;
  public _message: string;
  public _id: string;

  @Input() requestData: boolean;
  @Input() postId: string;

  private data: Post;
  @ViewChild(PostMenuComponent) menu: PostMenuComponent;
  public hover: boolean;

  public onHover: Delegate<[boolean]> = new Delegate<[boolean]>();

  get title(): string {
    return this._title || 'Title not found';
  }

  get user(): UserInfo {
    return this._user || User.defaultUserInfo;
  }

  get message(): string {
    return this._message || 'Message not found';
  }

  get id(): string {
    return this._id || 'Id not found';
  }

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

    this.onHover.add(([hovered]) => { this.menu.show = hovered; console.log(`hovered: ${hovered}`) });
  }

  private populateWithInfo(): void {
    this._id = this.data.id;
    this._user = this.data.user;
    this._message = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet at doloremque dolores eveniet neque non odio perspiciatis rerum, tempora tenetur.';
    this._title = `#${this.id}`
  }

  setDefault(): void {
    this.data = new Post('-1', { message: 'Post message', user: User.defaultUserInfo})
  }
}
