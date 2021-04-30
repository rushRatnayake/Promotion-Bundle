import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { RegisterService } from 'src/app/Services/register/register.service';

@Component({
  selector: 'app-designer-register',
  templateUrl: './designer-register.component.html',
  styleUrls: ['./designer-register.component.css']
})
export class DesignerRegisterComponent implements OnInit {

  formHeader!: FormGroup;

  loadform() {
    this.formHeader = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': [''],
      'role': ['designer'],
      'full_name': [''],
      'contact_no': [''],
      'gender': [''],
      'dob': [''],
      'designation':[''],
      'experience': [''],
      'min_pay': [''],
      'profile_pic': [''],

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
    this.formHeader.patchValue({ "dob": '2021-03-11T00:00' });
    this.spinner.show();
    if (this.formHeader?.invalid) {
      this.checked = true;
      this.toastr.warning('Please fill all required fields!');
      this.spinner.hide();
    }
    if (!this.formHeader?.invalid) {
      this.checked = false;
      this.registerService.registerDesigner(this.formHeader?.getRawValue()).subscribe(data => {
        if (data.success == true) {
          this.spinner.hide();
          this.router.navigate(['welcome/login/', "designer"]);
          this.toastr.success(data.payload);
          // this.formHeader.reset();
        }
        else {
          this.toastr.error("Error");
          this.spinner.hide();
        }
      });
    }

  }



  genderList = [
    { id: "Male", name: "Male" },
    { id: "Female", name: "Female" },
  ];

  minPayList = [
    { id: "40000", name: "40000" },
    { id: "70000", name: "70000" },
    { id: "100000", name: "100000" },
  ];

  isPersonalInfo = true;
  ngOnInit(): void {
  }

  nextClick() {
    this.isPersonalInfo = !this.isPersonalInfo;
  }

  doneClick() {
    this.isPersonalInfo = !this.isPersonalInfo;
  }

  onFileChange(event: any) {
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


}
