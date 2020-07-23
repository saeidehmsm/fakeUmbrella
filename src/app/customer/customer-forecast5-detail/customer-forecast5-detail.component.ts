import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-customer-forecast5-detail",
  templateUrl: "./customer-forecast5-detail.component.html",
  styleUrls: ["./customer-forecast5-detail.component.scss"],
})
export class CustomerForecast5DetailComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ["rainyDate", "rainyTime", "weather"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  rainyData;
  faCloudRain = faCloudRain;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
    this.rainyData = passedData;
  }

  ngOnInit(): void {
    this.dataSource.data = this.rainyData.rainyDateTime;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
