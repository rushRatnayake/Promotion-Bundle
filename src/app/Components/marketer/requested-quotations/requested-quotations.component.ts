import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile/profile.service';
import { QuotationService } from 'src/app/Services/quotation/quotation.service';

@Component({
  selector: 'app-requested-quotations',
  templateUrl: './requested-quotations.component.html',
  styleUrls: ['./requested-quotations.component.css']
})
export class RequestedQuotationsComponent implements OnInit {

  constructor(
    private router: Router,
    private quotationService: QuotationService,
    private profileService: ProfileService,
  ) { }

  quotationList!: any[];

  statusList = [
    { id: "Status1", name: "Status1" },
    { id: "Status2", name: "Status2" },
  ];

  userData!: any;

  ngOnInit(): void {
    this.loadDetails();
  }

  viewOrderStatus(list: any) {
    this.router.navigate(['marketer/requested_quotation_order_status/', list._id]);

  }

  async loadDetails() {
    await this.quotationService.getAllQuotations().subscribe(data => {
      this.quotationList = data.payload.quotations;
      let line = 0;
      this.quotationList.forEach(async element => {
        this.getSupplierName(element.to, line);
        line++;
      });
    });
  }

  async getSupplierName(id: any, line: any) {
    await this.profileService.getUserDetail(id).subscribe(data => {
      debugger;
      this.userData = data.payload;
      this.quotationList[line].supplier = this.userData.full_name;
    });
  }


}
