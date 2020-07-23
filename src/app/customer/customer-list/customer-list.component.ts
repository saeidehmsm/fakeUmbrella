import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { Customer } from "./../../model/customer";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs/internal/Subscription";
import { ConfirmationDialogService } from "src/app/confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "name",
    "contactPerson",
    "phone",
    "edit",
    "delete",
  ];
  dataSource = new MatTableDataSource<Customer>();
  private unsubscribe: Subscription;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private customerService: CustomerService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.Initiate();
  }

  private Initiate() {
    this.unsubscribe = this.customerService
      .getAllCustomer()
      .subscribe((customers) => {
        this.dataSource.data = customers;
      });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openConfirmDelete(customerId: string) {
    this.confirmationDialogService
      .confirm("confirm", "Would you like to delete ?")
      .then((confirmed) => {
        if (confirmed) {
          console.log("User confirmed:", confirmed);
          this.deleteCustomer(customerId);
        }
      })
      .catch(() => console.log("cancel confirmation"));
  }

  deleteCustomer(customerId: string) {
    this.customerService.deleteCustomer(customerId).then((result) => {
      console.log(result);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
