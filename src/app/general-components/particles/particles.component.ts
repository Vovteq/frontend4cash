import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss']
})
export class ParticlesComponent implements OnInit {
  @Input() style;
  @Input() params;
  @Input() width;
  @Input() height;

  constructor() { }

  ngOnInit(): void {

  }

}
