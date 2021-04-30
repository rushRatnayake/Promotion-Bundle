import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { QuotationService } from 'src/app/Services/quotation/quotation.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';
import { InvoiceService } from 'src/app/Services/invoice/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FILE_URL } from 'src/app/app-global';


@Component({
  selector: 'app-requested-quotation-order-status',
  templateUrl: './requested-quotation-order-status.component.html',
  styleUrls: ['./requested-quotation-order-status.component.css']
})
export class RequestedQuotationOrderStatusComponent implements OnInit {

  quotation: any = [];
  id!: any;
  userdetails: any;
  quotationAvailable :boolean = false;
  invoiceAvailable : boolean = false;
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
      this.loadUserDetails();
      if(this.quotation.file != null && this.quotation.file != "" ){
        this.quotationAvailable = true;
      }else{
        this.quotationAvailable = false;
      }
      if(this.quotation.invoice != null && this.quotation.invoice != "" ){
        this.invoiceAvailable = true;
      }else{
        this.invoiceAvailable = false;
      }
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
