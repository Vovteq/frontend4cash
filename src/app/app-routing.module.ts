import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChartComponent} from "ng-apexcharts";
import {HomePageComponent} from "./outlet-components/home-page/home-page.component";
import {NewsPageComponent} from "./outlet-components/news-page/news-page.component";
import {MonitoringPageComponent} from "./outlet-components/monitoring-page/monitoring-page.component";
import {ForumPageComponent} from "./outlet-components/forum-page/forum-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'monitoring', component: MonitoringPageComponent },
  { path: 'forum', component: ForumPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
