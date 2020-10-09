import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './general-components/navbar/navbar.component';
import { LinkButtonComponent } from './buttons/link-button/link-button.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { ScriptBridgeComponent } from './general-components/script-bridge/script-bridge.component';
import { ChartContainerComponent } from './general-components/chart-container/chart-container.component';
import {HttpClientModule} from "@angular/common/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {CurrencyService} from "./services/currency.service";
import { ParticlesComponent } from './general-components/particles/particles.component';
import {ScriptService} from "./services/script.service";
import { ContextButtonComponent } from './buttons/context-button/context-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LinkButtonComponent,
    ScriptBridgeComponent,
    ChartContainerComponent,
    ParticlesComponent,
    ContextButtonComponent
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
    CurrencyService,
    ScriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
