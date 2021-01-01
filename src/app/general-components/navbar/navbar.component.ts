import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalService} from "../../services/modal.service";
import {ConnectionService} from "../../services/connection.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('noConnection', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('700ms cubic-bezier(0.680, -0.550, 0.460, 0.995)', style({ opacity: '0', transform: 'translateX(40px)' })),
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('700ms cubic-bezier(0.680, -0.550, 0.460, 0.995)', style({ opacity: '1', transform: 'translateX(0)' })),
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService, public modalService: ModalService, public connectionService: ConnectionService) {
  }

  ngOnInit(): void {
  }


}
