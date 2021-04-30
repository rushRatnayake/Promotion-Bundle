import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from 'src/app/Services/quotation/quotation.service';
import { UserService } from 'src/app/Services/user/user.service';
import { InvoiceService } from 'src/app/Services/invoice/invoice.service';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-request-quotation-view',
  templateUrl: './request-quotation-view.component.html',
  styleUrls: ['./request-quotation-view.component.css']
})
export class RequestQuotationViewComponent implements OnInit {

  quotation: any;
  id!: any;

  userdetails: any;

  constructor(
    private location: Location,
    private quotationService: QuotationService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private userService: UserService,
    private commonService: CommonService,

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
    });
  }


  async loadUserDetails() {
    await this.userService.getMarketerById(this.quotation.from).subscribe(data => {
      debugger;
      this.userdetails = data.payload;
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.commonService.postImage(formData).subscribe(data => {
        data.payload.file_path
        this.onSubmit(data.payload.file_path);
      });
    }

  }

  onSubmit(invoice: any) {
    var obj = {
      "invoice": invoice
    }
    this.invoiceService.postInvoice(obj, this.quotation._id).subscribe(data => {
      if (data.success == true) {
        this.spinner.hide();
        this.toastr.success(data.payload);
      }
      else {
        this.toastr.error(data.detail);
        this.spinner.hide();
      }
    });
  }


}
