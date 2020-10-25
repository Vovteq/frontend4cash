import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForumPageComponent implements OnInit {

  constructor(public userService: UserService, public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
