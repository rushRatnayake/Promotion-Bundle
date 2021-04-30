import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UPDATE_MSG } from 'src/app/app-global';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProfileService } from 'src/app/Services/profile/profile.service';

@Component({
  selector: 'app-designer-profile',
  templateUrl: './designer-profile.component.html',
  styleUrls: ['./designer-profile.component.css']
})
export class DesignerProfileComponent implements OnInit {

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

      this.formHeader.patchValue(data.payload);
      this.formHeader.patchValue({ "dob": this.commonService.getDateTimeOnDateFormat(data.payload.dob) });
      this.getImage();
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

  uploadProfileImage() {

  }

  // imageSrc: string = '';
  onFileChange(event: any) {


    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.commonService.postImage(formData).subscribe(data => {

        this.formHeader.patchValue({
          "profile_pic": data.payload.file_path
        })
        this.getImage();
      });

    }


    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.imageSrc = reader.result as string;
        this.formHeader.patchValue({
          "profile_pic": reader.result
        });
      };
    }

  }

  // getImage() {
  //   let filepath = this.formHeader.get('profile_pic')!.value;
  //   this.commonService.getImage(filepath).subscribe(data => {
  //     
  //   })
  // }

  async getImage() {
    let filepath = this.formHeader.get('profile_pic')!.value;
    this.isImageLoading = true;
    (await this.commonService.getImage(filepath)).subscribe(data => {
      debugger;
      this.createImageFromBlob(data);
      debugger;
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  imageToShow: any;
  isImageLoading: boolean = true;

  createImageFromBlob(image: Blob) {
    debugger;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }



}
