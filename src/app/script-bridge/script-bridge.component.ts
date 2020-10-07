import { Component, OnInit } from '@angular/core';
import ScriptBridge from "../../scripts/ts/utils/ScriptBridge";

@Component({
  selector: 'app-script-bridge',
  templateUrl: './script-bridge.component.html',
  styleUrls: ['./script-bridge.component.scss']
})
export class ScriptBridgeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ScriptBridge.viewInit();
  }

}
