import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from "ng6-toastr-notifications";

//Firebase
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";

//componenrs
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavComponent } from "./navigation/sidenav/sidenav.component";
import { CustomerListComponent } from "./customer/customer-list/customer-list.component";
import { CustomerDetailComponent } from "./customer/customer-detail/customer-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LayoutComponent } from "./layout/layout.component";
import { CustomerForecast5Component } from "./customer/customer-forecast5/customer-forecast5.component";
import { CustomerBarChartComponent } from "./customer/customer-bar-chart/customer-bar-chart.component";
import { CustomerForecast5DetailComponent } from "./customer/customer-forecast5-detail/customer-forecast5-detail.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    PageNotFoundComponent,
    LayoutComponent,
    CustomerForecast5Component,
    CustomerBarChartComponent,
    CustomerForecast5DetailComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
