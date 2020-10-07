import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LinkButtonComponent } from './link-button/link-button.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { ScriptBridgeComponent } from './script-bridge/script-bridge.component';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LinkButtonComponent,
    ScriptBridgeComponent,
    ChartContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
