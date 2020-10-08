import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../services/script.service";

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss']
})
export class ParticlesComponent implements OnInit {

  constructor(private scripts: ScriptService) { }

  ngOnInit(): void {
    this.scripts.load('particles-js')
  }

}
