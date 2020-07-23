import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";

import { CustomerListComponent } from "./customer/customer-list/customer-list.component";
import { CustomerDetailComponent } from "./customer/customer-detail/customer-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CustomerForecast5Component } from "./customer/customer-forecast5/customer-forecast5.component";
import { CustomerBarChartComponent } from "./customer/customer-bar-chart/customer-bar-chart.component";

const routes: Routes = [
  { path: "customerList", component: CustomerListComponent },
  { path: "customerDetail/:id", component: CustomerDetailComponent },
  { path: "customerDetail", component: CustomerDetailComponent },
  { path: "customerForcaste5", component: CustomerForecast5Component },
  { path: "customerBarchart", component: CustomerBarChartComponent },
  { path: "", redirectTo: "/customerList", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FlexLayoutModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
