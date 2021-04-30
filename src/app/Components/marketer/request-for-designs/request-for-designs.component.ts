import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { DesignService } from 'src/app/Services/design/design.service';
import { CREATE_MSG } from 'src/app/app-global';


@Component({
  selector: 'app-request-for-designs',
  templateUrl: './request-for-designs.component.html',
  styleUrls: ['./request-for-designs.component.css']
})
export class RequestForDesignsComponent implements OnInit {

  designList: any = [
    // {
    //   id: 1, design_type: "Full Artwork1", pay_range: "10000-12500", date: "2021-01-01", requests: "Received"
    // },
    // {
    //   id: 2, design_type: "Bundle Art only", pay_range: "7500-8500", date: "2021-01-01", requests: "Sent"
    // },
    // {
    //   id: 3, design_type: "Social Media Artwork", pay_range: "4000-7000", date: "2021-01-01", requests: "Received"
    // },
    // {
    //   id: 4, design_type: "Full Artwork2", pay_range: "15000-17500", date: "2021-01-01", requests: "Sent"
    // },
  ];

  tempList = [
    {
      "type": "new",
      "email": null,
      "price": null,
      "pay_range": "1",
      "no_images": 10,
      "images": [],
      "due_date": "2021-03-23T00:00:00",
      "status": "pending",
      "requester": "A1BEMKOWN1TJK4",
      "acceptors": [],
      "confirmed_designer": null,
      "created_at": "2021-03-23T16:31:38.736000",
      "updated_at": "2021-03-23T16:31:38.736000",
      "_id": "605a17ea62f7d1390967f15a"
    }
  ];


  payRangelist = [
    {
      id: "10000-20000", name: "10000-20000"
    },
    {
      id: "20000-30000", name: "20000-30000"
    }
  ]

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private designService: DesignService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.loadform();
    this.loadDetails();
  }

  formHeader!: FormGroup;
  loadform() {
    this.formHeader = this.formBuilder.group({
      'type': [''],
      'pay_range': [''],
      'no_images': [''],
      'due_date': [''],
    });
  }

  checked: boolean = false;
  onSubmit() {
    this.formHeader.patchValue({ "due_date": this.commonService.getDateOnDateTimeFormat(this.formHeader.get('due_date')?.value) });
    this.spinner.show();
    if (this.formHeader?.invalid) {
      this.checked = true;
      this.toastr.warning('Please fill all required fields!');
      this.spinner.hide();
    }
    if (!this.formHeader?.invalid) {
      this.checked = false;
      this.designService.postDesign(this.formHeader?.getRawValue()).subscribe(data => {
        if (data.success == true) {
          this.loadDetails();
          this.toastr.success(CREATE_MSG);
          this.formHeader.reset();
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        }
        else {
          this.toastr.error("Error");
          this.spinner.hide();
        }
      });
    }
  }

  async loadDetails() {
    await this.designService.getRequestedDesigns().subscribe(data => {
      this.tempList = data.payload.designs;
      this.designList = this.tempList;


    });
  }

}
