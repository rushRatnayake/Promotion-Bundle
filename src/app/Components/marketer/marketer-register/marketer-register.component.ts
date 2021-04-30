import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { RegisterService } from 'src/app/Services/register/register.service';

@Component({
  selector: 'app-marketer-register',
  templateUrl: './marketer-register.component.html',
  styleUrls: ['./marketer-register.component.css']
})
export class MarketerRegisterComponent implements OnInit {

  formHeader!: FormGroup;

  loadform() {
    this.formHeader = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': [''],
      'role': ['marketer'],
      'full_name': [''],
      'contact_no': [''],
      'company': [''],
      'designation': [''],
      'type': [''],
      'industry': [''],
      'profile_pic': [''],
      'company_pic': [''],

    });

  }


  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private registerService: RegisterService,
    private commonService: CommonService,
    private router: Router

  ) {
    this.loadform();

  }

  checked: boolean = false;
  onSubmit() {
    console.log({ "data: ": this.formHeader?.value });
    this.spinner.show();
    if (this.formHeader?.invalid) {
      this.checked = true;
      this.spinner.hide();
      this.toastr.warning('Please fill all required fields!');
    }
    if (!this.formHeader?.invalid) {
      this.checked = false;
      this.registerService.registerMarketer(this.formHeader?.getRawValue()).subscribe(data => {
        if (data.success == true) {
          this.spinner.hide();
          this.toastr.success(data.payload);
          this.formHeader.reset();
          this.router.navigate(['welcome/login/', "marketer"]);
        }
        else {
          this.toastr.error(data.error.message);
          this.spinner.hide();
        }
      });
    }

  }


  industryList = [
    { id: "Value 1", name: "Value 1" },
    { id: "Value 2", name: "Value 2" },
  ];

  productServiceList = [
    { id: "Value 1", name: "Value 1" },
    { id: "Value 2", name: "Value 2" },
  ];

  isPersonalInfo = true;
  ngOnInit(): void {
  }

  nextClick() {
    this.isPersonalInfo = !this.isPersonalInfo;
  }

  // doneClick() {
  //   this.isPersonalInfo = !this.isPersonalInfo;
  // }


  onFileChange1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.commonService.postImage(formData).subscribe(data => {
        this.formHeader.patchValue({
          "profile_pic": data.payload.file_path
        })
      });
    }
  }


  onFileChange2(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.commonService.postImage(formData).subscribe(data => {
        this.formHeader.patchValue({
          "company_pic": data.payload.file_path
        })
      });
    }
  }




}
