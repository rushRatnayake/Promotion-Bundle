import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile/profile.service';
import { QuotationService } from 'src/app/Services/quotation/quotation.service';

@Component({
  selector: 'app-request-quotation-list',
  templateUrl: './request-quotation-list.component.html',
  styleUrls: ['./request-quotation-list.component.css']
})
export class RequestQuotationListComponent implements OnInit {

  constructor(
    private router: Router,
    private quotationService: QuotationService,
    private profileService: ProfileService,
  ) { }

  quotationList!: any[];
  userData: any;

  statusList = [
    { id: "Status1", name: "Status1" },
    { id: "Status2", name: "Status2" },
  ];

  ngOnInit(): void {
    this.loadDetails();
  }

  viewOrderStatusClick(list: any) {
    this.router.navigate(['supplier/quotation_view/', list._id]);

  }

  async loadDetails() {
    await this.quotationService.getAllQuotations().subscribe(data => {
      this.quotationList = data.payload.quotations;
      let line = 0;
      this.quotationList.forEach(async element => {
        this.getMarketerName(element.from, line);
        line++;
      });
    });
  }


  async getMarketerName(id: any, line: any) {
    await this.profileService.getUserDetail(id).subscribe(data => {
      this.userData = data.payload;
      this.quotationList[line].marketer = this.userData.full_name;
    });
  }



  onAccept(list: any) {
    this.quotationService.putAcceptQuotation(list._id).subscribe(data => {
      this.loadDetails();
    });
  }


  onReject(list: any) {
    this.quotationService.putRejectQuotation(list._id).subscribe(data => {
      this.loadDetails();
    });
  }



}
