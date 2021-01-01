import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChartComponent} from "ng-apexcharts";
import {HomePageComponent} from "./outlet-components/home-page/home-page.component";
import {NewsPageComponent} from "./outlet-components/news-page/news-page.component";
import {MonitoringPageComponent} from "./outlet-components/monitoring-page/monitoring-page.component";
import {ForumPageComponent} from "./outlet-components/forum-page/forum-page.component";
import {AccountPageComponent} from "./outlet-components/account-page/account-page.component";
import {AccountHomePageComponent} from "./outlet-components/account-page/outlets/account-home-page/account-home-page.component";
import {AccountGuard} from "./guards/account.guard";
import {ErrorPageComponent} from "./outlet-components/error-page/error-page.component";
import {ExchangePageComponent} from "./outlet-components/exchange-page/exchange-page.component";
import {AccountPaymentPageComponent} from "./outlet-components/account-page/outlets/account-payment-page/account-payment-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'monitoring', component: MonitoringPageComponent },
  { path: 'forum', component: ForumPageComponent },
  { path: 'exchange', component: ExchangePageComponent },
  { path: 'account', component: AccountPageComponent, canActivate: [AccountGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: AccountHomePageComponent },
      { path: 'payment', component: AccountPaymentPageComponent }
    ]},
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
