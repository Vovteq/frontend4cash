import {Component, Input, OnInit} from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public questionIcon = faQuestionCircle;

  constructor() {
  }

  ngOnInit(): void {
  }


}
