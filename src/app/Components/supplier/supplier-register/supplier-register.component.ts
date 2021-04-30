import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { RegisterService } from 'src/app/Services/register/register.service';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.css']
})
export class SupplierRegisterComponent implements OnInit {

  formHeader!: FormGroup;

  loadform() {
    this.formHeader = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': [''],
      'role': ['supplier'],
      'full_name': [''],
      'contact_no': [''],
      'company': [''],
      'type': [''],
      'industry': [''],
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
      this.toastr.warning('Please fill all required fields!');
      this.spinner.hide();
    }
    if (!this.formHeader?.invalid) {
      this.checked = false;
      this.registerService.registerSupplier(this.formHeader?.getRawValue()).subscribe(data => {
        if (data.success == true) {
          this.spinner.hide();
          this.toastr.success(data.payload);
          this.formHeader.reset();
          this.router.navigate(['welcome/login/', "supplier"]);
        }
        else {
          this.toastr.error("Error");
          this.spinner.hide();
        }
      });
    }

  }


  industryList = [
    { id: "industry1", name: "industry1" },
    { id: "industry2", name: "industry2" },
  ];

  productServiceList = [
    { id: "Product", name: "Product" },
    { id: "Service", name: "Service" },
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
          "company_pic": data.payload.file_path
        })
      });
    }
  }

}
