import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { QuotationService } from 'src/app/Services/quotation/quotation.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';
import { InvoiceService } from 'src/app/Services/invoice/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-requested-quotation-order-status',
  templateUrl: './requested-quotation-order-status.component.html',
  styleUrls: ['./requested-quotation-order-status.component.css']
})
export class RequestedQuotationOrderStatusComponent implements OnInit {

  quotation: any = [];
  id!: any;
  userdetails: any;

  constructor(
    private location: Location,
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private userService: UserService,
    private invoiceService: InvoiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.loadDetails();
  }

  backButtonClick() {
    this.location.back()
  }

  async loadDetails() {
    await this.quotationService.getSingleQuotation(this.id).subscribe(data => {
      this.quotation = data.payload;
      console.log(this.quotation);
      this.loadUserDetails();
    });
  }

  async loadUserDetails() {
    await this.userService.getSupplierById(this.quotation.to).subscribe(data => {
      debugger;
      this.userdetails = data.payload;
    });
  }

  acceptClick(id: any) {
    var obj = {
      "seller_id": this.userdetails.id
    }
    this.invoiceService.postOrders(obj).subscribe(data => {
      if (data.success == true) {
        this.spinner.hide();
        this.toastr.success(data.payload);
      }
      else {
        this.toastr.error("Error");
        this.spinner.hide();
      }
    });
  }

}
