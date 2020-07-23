import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import * as Chart from "chart.js";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-customer-bar-chart",
  templateUrl: "./customer-bar-chart.component.html",
  styleUrls: ["./customer-bar-chart.component.scss"],
})
export class CustomerBarChartComponent implements OnInit, AfterViewInit {
  chartColors = {
    red: "rgb(235, 14, 14)",
    green: "rgb(100, 213, 71)",
  };
  @ViewChild("rainyChart") chart: ElementRef<HTMLCanvasElement>;
  public ctx: CanvasRenderingContext2D;
  result;
  chartLable = [];
  chartData = [];
  hasRainyDays = [];
  chartColor = [
    this.chartColors.red,
    this.chartColors.red,
    this.chartColors.red,
    this.chartColors.red,
  ];
  chartType = "bar";

  chartOptions = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 50,
          },
        },
      ],
    },
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.ctx = this.chart.nativeElement.getContext("2d");
    this.getChartData();
  }

  getChartData() {
    this.customerService.getTop4Customers().subscribe((finalResult) => {
      //console.log(finalResult);
      this.result = finalResult;
      if (!finalResult || (finalResult && finalResult.length == 0)) {
        return;
      }
      for (const item of finalResult) {
        if (item.hasOwnProperty("customerName"))
          this.chartLable.push(item.customerName);
        if (item.hasOwnProperty("employeeCount"))
          this.chartData.push(+item.employeeCount);
        if (item.hasOwnProperty("isRainy"))
          this.hasRainyDays.push(item.isRainy);
      }
      this.initializChart();
    });
  }

  initializChart() {
    var myChart = new Chart(this.ctx, {
      type: this.chartType,
      data: {
        labels: this.chartLable,
        datasets: [
          {
            label: "",
            backgroundColor: this.chartColor,
            data: this.chartData,
          },
        ],
      },
      options: this.chartOptions,
    });

    var dataset = myChart.data.datasets[0];
    for (var i = 0; i < this.hasRainyDays.length; i++) {
      if (this.hasRainyDays[i])
        dataset.backgroundColor[i] = this.chartColors.green;
    }

    myChart.update();
  }
}
