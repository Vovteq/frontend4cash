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
import {ScriptService} from "./services/script.service";
import { ContextButtonComponent } from './buttons/context-button/context-button.component';
import {ReferenceService} from "./services/reference.service";
import {ButtonService} from "./services/button.service";
import { NewsComponent } from './general-components/news/news.component';
import { ModalComponent } from './general-components/modal/modal.component';
import {ModalService} from "./services/modal.service";
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PostService} from "./services/post.service";
import { PostComponent } from './general-components/post/post.component';
import { CutTextPipe } from './pipes/cut-text.pipe';
import { HoverPipe } from './pipes/hover.pipe';
import { PostMenuComponent } from './general-components/post/post-menu/post-menu.component';
import { StickyMessageComponent } from './general-components/sticky-message/sticky-message.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {UserService} from "./services/user.service";
import { CurrencyComponent } from './general-components/currency/currency.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LinkButtonComponent,
    ScriptBridgeComponent,
    ChartContainerComponent,
    ContextButtonComponent,
    NewsComponent,
    ModalComponent,
    SanitizeHtmlPipe,
    PostComponent,
    CutTextPipe,
    HoverPipe,
    PostMenuComponent,
    StickyMessageComponent,
    CurrencyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgApexchartsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forChild(),
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    CurrencyService,
    ScriptService,
    ReferenceService,
    ButtonService,
    ModalService,
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
