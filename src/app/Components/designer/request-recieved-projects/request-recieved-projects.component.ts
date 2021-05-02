import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Services/common/common.service';
import { DesignService } from 'src/app/Services/design/design.service';
import { QuotationService } from 'src/app/Services/quotation/quotation.service';
import { UserService } from 'src/app/Services/user/user.service';
import { UPDATE_MSG } from 'src/app/app-global';
import { ProfileService } from 'src/app/Services/profile/profile.service';
import { element } from 'protractor';

@Component({
  selector: 'app-request-recieved-projects',
  templateUrl: './request-recieved-projects.component.html',
  styleUrls: ['./request-recieved-projects.component.css']
})
export class RequestRecievedProjectsComponent implements OnInit {

  status: any;
  minpay: any;
  period: any;
  pending: any = 'pending';
  accepted: any = 'accepted';
  selectedStatus: any = "pending";
  availableList = [
    { id: "1", name: "1 Week" },
    { id: "2", name: "2 Weeks" },
    { id: "3", name: "3 Weeks" },
    { id: "4", name: "4 Weeks" },
  ];

  statusList = [
    { id: "pending", name: "pending" },
    { id: "accepted", name: "accepted" },
  ];

  userData:any = "";
  requestStatus = "";
  projectList!: any[];

  constructor(
    private designService: DesignService,
    private quotationService: QuotationService,
    private userService: UserService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private profileService: ProfileService,

  ) { }

  ngOnInit(): void {
    this.loadDetails("pending");

  }

  selectStatus(event: any) {
    this.selectedStatus = event.name;
    this.loadDetails(event.name);
  }

  async loadDetails(status: any) {
    // await this.designService.getDesignSearch(this.period, this.minpay, this.status).subscribe(data => {
    await this.designService.getDesignSearch(status).subscribe(data => {
      this.projectList = data.payload.designs;
      let line = 0;
      this.projectList.forEach(element => {
        debugger
        this.getMarketerName(element.requester,line);
        line++;
      });
    });
    
  }

  async getMarketerName(id: any, line: any) {
    await this.profileService.getUserDetail(id).subscribe(data => {
      this.userData = data.payload;
      debugger
      this.projectList[line].email = this.userData.email;
      debugger
    });
  }
  onAccept(list: any) {
    this.designService.putAcceptDesign(list._id).subscribe(data => {
      // this.projectList = data.payload.designs;

      this.loadDetails(this.selectedStatus);
    });
  }


  onReject(list: any) {
    this.designService.putRejectDesign(list._id).subscribe(data => {
      // this.projectList = data.payload.designs;

      this.loadDetails(this.selectedStatus);
    });
  }

  onFileChange(event: any, list: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.commonService.postImage(formData).subscribe(data => {
        data.payload.file_path
        this.onSubmit(list._id, data.payload.file_path);
      });
    }
  }

  onSubmit(_id: any, path: any) {
    this.quotationService.putSupplierUploadQuotation(_id, path).subscribe(data => {
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

  updateSupplierDetail() {
    this.userService.putSupplier(this.min_pay, this.availability).subscribe(data => {
      if (data.success == true) {
        this.spinner.hide();
        this.toastr.success(UPDATE_MSG);
      }
      else {
        this.toastr.error(data.detail);
        this.spinner.hide();
      }
    });
  }

  availability: any;
  min_pay: any;

  onChange1(event: any) {
    this.availability = event.id;
  }
  onChange2(event: any) {
    this.min_pay = event.target.value;
  }

}
