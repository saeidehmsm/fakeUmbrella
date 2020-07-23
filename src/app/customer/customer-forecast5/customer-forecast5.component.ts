import {
  Component,
  OnInit,
  ViewChild,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
} from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import * as _ from "lodash";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";

import { CustomerService } from "src/app/services/customer.service";
import { CustomerForecast5DetailComponent } from "../customer-forecast5-detail/customer-forecast5-detail.component";

@Component({
  selector: "app-customer-forecast5",
  templateUrl: "./customer-forecast5.component.html",
  styleUrls: ["./customer-forecast5.component.scss"],
})
export class CustomerForecast5Component implements OnInit {
  displayedColumns: string[] = ["name", "contact", "phone", "city", "detail"];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  faUmbrellaBeach = faUmbrellaBeach;
  private subscribe: Subscription;
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRainyCustomers();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getRainyCustomers() {
    this.subscribe = this.customerService
      .getRainyCustomers()
      .subscribe((data: []) => {
        if (data && data.length) {
          this.dataSource.data = data;
        }
      });
  }

  openDialog(element) {
    this.dialog.open(CustomerForecast5DetailComponent, {
      data: element,
      width: "600px",
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
