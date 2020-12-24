import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalService} from "../../services/modal.service";
import {animate, group, style, transition, trigger} from "@angular/animations";
import {PostInfo} from "../../../scripts/ts/metadata/Post";
import {UserInfo} from "../../../scripts/ts/metadata/User";

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(200px)' }),
        group([
          animate('300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({ opacity: 1 })),
          animate('800ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({ transform: 'translateY(0)' })),
        ])
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ForumPageComponent implements OnInit {

  private _posts: PostInfo[];

  public get posts(): PostInfo[] {
    return this._posts;
  }

  constructor(public userService: UserService, public modalService: ModalService) { }

  ngOnInit(): void {
    const testUser: UserInfo = {id: '0', ownedCoins: {}, cash: '0', status: '', nickname: 'Auf', password: '', email: ''}

    this._posts = [
      { user: testUser, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'},
      { user: testUser, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'},
      { user: testUser, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'},
      { user: testUser, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'},
      { user: testUser, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'},
    ]
  }

}
