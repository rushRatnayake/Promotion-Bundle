import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard/dashboard.service';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import { Label } from 'ng2-charts';
// import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-marketer-dashboard',
  templateUrl: './marketer-dashboard.component.html',
  styleUrls: ['./marketer-dashboard.component.css']
})
export class MarketerDashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {}
  // For Pie Chart
  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  //   // legend: {
  //   //   position: 'top',
  //   // }
  // };
  // public pieChartLabels: Label[] = [];
  // public pieChartData: number[] = [300, 500, 100];
  // public pieChartType: ChartType = 'pie';
  // public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  // public pieChartColors = [
  //   {
  //     backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
  //   },
  // ];


  ngOnInit(): void {
    this.loadDetails();
  }

  dashboardDetails: any;
  async loadDetails() {
    await this.dashboardService.getMarketerDashboard().subscribe(data => {
      this.dashboardDetails = data.payload;

    });
  }


}
