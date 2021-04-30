import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard/dashboard.service';

@Component({
  selector: 'app-marketer-dashboard',
  templateUrl: './marketer-dashboard.component.html',
  styleUrls: ['./marketer-dashboard.component.css']
})
export class MarketerDashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  dashboardDetails: any;
  async loadDetails() {
    await this.dashboardService.getMarketerDashboard().subscribe(data => {
      debugger;
      this.dashboardDetails = data.payload;

    });
  }


}
