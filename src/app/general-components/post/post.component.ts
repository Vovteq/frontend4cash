import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PostService} from "../../services/post.service";
import {User, UserInfo} from "../../../scripts/ts/metadata/User";
import {Post, PostInfo} from "../../../scripts/ts/metadata/Post";
import {PostMenuComponent} from "./post-menu/post-menu.component";
import {Delegate} from "../../../scripts/ts/delegates/Delegate";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('post', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(100px)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate('300ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({opacity: 0, transform: 'translateX(-100px)'}))
      ])
    ]),
    trigger('newPost', [
      state('appearRight', style({opacity: 0, transform: 'translateX(200px)'})),
      state('appearLeft', style({opacity: 0, transform: 'translateX(-200px)'})),
      state('active', style({opacity: 1, transform: 'translateX(0)'})),
      state('disappearLeft', style({opacity: 0, transform: 'translateX(-200px)'})),
      state('disappearRight', style({opacity: 0, transform: 'translateX(200px)'})),
      transition('active => *', animate('300ms ease-out')),
      transition('* => active', animate('300ms ease-out')),
      transition('void => *', animate('0ms'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  public _title: string;
  public _userName: string;
  public _message: string;
  public _id: number;
  public render: boolean = false;

  @Input() requestData: boolean;
  @Input() postId: string;
  @Input() prebuiltData: PostInfo;

  public fadeRight: boolean;
  public appearRight: boolean;

  private initializing: boolean = true;
  public full: boolean;

  private data: Post;
  @ViewChild(PostMenuComponent) menu: PostMenuComponent;
  public hover: boolean;

  public onHover: Delegate<[boolean]> = new Delegate<[boolean]>();

  get title(): string {
    return this._title || 'Title not found';
  }

  public get currentState(): string {
    if (this.initializing) {
      return this.appearRight ? 'appearRight' : 'appearLeft';
    }
    if (this.render) {
      return 'active';
    }
    return this.fadeRight ? 'disappearRight' : 'disappearLeft';
  }

  get message(): string {
    return this._message || 'Message not found';
  }

  get id(): string {
    return '0';
  }

  constructor(private postService: PostService, public el: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializing = false;
    }, 1);
    if(this.requestData) {
      this.postService.getPost(this.postId).subscribe(data => {
        this.data = data;
        this.populateWithInfo();
      });
    } else {
      if (this.prebuiltData !== null) {
        this.data = new Post(parseInt(this.id), this.prebuiltData);
      } else {
        this.setDefault();
      }
      this.populateWithInfo();
    }

    this.onHover.add(([hovered]) => {
      if (this.menu !== undefined) {
        this.menu.show = hovered;
      }
    });
  }

  private populateWithInfo(): void {
    this._id = this.data.id;
    this._userName = this.data.user;
    this._message = this.data.message;
    this._title = this.data.title;
  }

  public openFull(): void {
    this.full = true;
  }

  public hideFull(): void {
    this.full = false;
  }

  setDefault(): void {
    this.data = new Post(-1, { content: 'Post message', authorName: User.defaultUserInfo.username, title: 'defaultTitle', id: 0})
  }
}
