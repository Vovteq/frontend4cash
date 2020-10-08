import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LinkButtonComponent } from './buttons/link-button/link-button.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { ScriptBridgeComponent } from './script-bridge/script-bridge.component';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import {HttpClientModule} from "@angular/common/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {CurrencyService} from "./services/currency.service";
import { ParticlesComponent } from './particles/particles.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LinkButtonComponent,
    ScriptBridgeComponent,
    ChartContainerComponent,
    ParticlesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgApexchartsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forChild()
  ],
  providers: [
    CurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
