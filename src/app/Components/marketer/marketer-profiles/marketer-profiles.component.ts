import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UPDATE_MSG } from 'src/app/app-global';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { ImageService } from 'src/app/Services/image/image.service';
import { ProfileService } from 'src/app/Services/profile/profile.service';

@Component({
  selector: 'app-marketer-profiles',
  templateUrl: './marketer-profiles.component.html',
  styleUrls: ['./marketer-profiles.component.css']
})
export class MarketerProfilesComponent implements OnInit {

  genderList = [
    { id: "Male", name: "Male" },
    { id: "Female", name: "Female" },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private profileService: ProfileService,
    private imageService: ImageService,
    private commonService: CommonService,

  ) { }

  currentUser: any;

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(data => this.currentUser = data);

    this.loadform();
    this.loadDetails();
  }

  async loadDetails() {
    await this.profileService.getUserDetail(this.currentUser.id).subscribe(data => {
      debugger;
      this.formHeader.patchValue(data.payload);
      this.formHeader.patchValue({ "dob": this.commonService.getDateTimeOnDateFormat(data.payload.dob) });
      this.getImage1()
      this.getImage2()
    });
  }


  formHeader!: FormGroup;

  loadform() {
    this.formHeader = this.formBuilder.group({
      'email': [''],
      'password': [''],
      'role': [''],
      'full_name': [''],
      'contact_no': [''],
      'company': [''],
      'designation': [''],
      'type': [''],
      'industry': [''],
      'profile_pic': [''],
      'company_pic': [''],
      'gender': [''],
      'dob': [''],
      'experience': [''],
      'min_pay': [''],
      'id': [''],

    });

  }


  editClick() {
    console.log("Edit Clicked");
  }


  checked: boolean = false;
  onSubmit() {
    this.formHeader.patchValue({ "dob": this.commonService.getDateOnDateTimeFormat(this.formHeader.get('dob')?.value) });
    this.spinner.show();
    if (this.formHeader?.invalid) {
      this.checked = true;
      this.toastr.warning('Please fill all required fields!');
      this.spinner.hide();
    }
    if (!this.formHeader?.invalid) {
      this.checked = false;
      this.profileService.updateUserDetail(this.formHeader?.getRawValue()).subscribe(data => {
        this.authService.getUserDetails(); // REFRESH USER
        if (data.success == true) {
          this.toastr.success(UPDATE_MSG);
          this.loadDetails();
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


  onFileChange1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.commonService.postImage(formData).subscribe(data => {

        this.formHeader.patchValue({
          "profile_pic": data.payload.file_path
        })
        this.getImage1();
      });

    }
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formHeader.patchValue({
          profile_pic: reader.result
        });
      };
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
        this.getImage2();
      });

    }
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formHeader.patchValue({
          company_pic: reader.result
        });
      };
    }

  }


  async getImage1() {
    let filepath = this.formHeader.get('profile_pic')!.value;
    this.isImageLoading = true;
    (await this.commonService.getImage(filepath)).subscribe(data => {
      debugger;
      this.createImageFromBlob1(data);
      debugger;
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }
  async getImage2() {
    let filepath = this.formHeader.get('company_pic')!.value;
    this.isImageLoading = true;
    (await this.commonService.getImage(filepath)).subscribe(data => {
      debugger;
      this.createImageFromBlob2(data);
      debugger;
      this.isImageLoading = false;
    }, (error: any) => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  imageToShow1: any;
  imageToShow2: any;
  isImageLoading: boolean = true;

  createImageFromBlob1(image: Blob) {
    debugger;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow1 = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  createImageFromBlob2(image: Blob) {
    debugger;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow2 = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
