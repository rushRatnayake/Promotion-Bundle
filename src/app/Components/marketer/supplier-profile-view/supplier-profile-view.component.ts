import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProfileService } from 'src/app/Services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-supplier-profile-view',
  templateUrl: './supplier-profile-view.component.html',
  styleUrls: ['./supplier-profile-view.component.css']
})
export class SupplierProfileViewComponent implements OnInit {

  selected = 3;
  hovered = 0;
  readonly = true;
  param: string = '';
  userData: any;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
    private commonService: CommonService,

  ) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id') || '';
    this.loadDetails(this.param);
  }

  backButtonClick() {
    this.location.back()
  }

  async loadDetails(id: any) {
    await this.profileService.getUserDetail(id).subscribe(data => {
      this.userData = data.payload;
      console.log(this.userData.ratings);
      this.getImage(this.userData.company_pic);

    });
  }

  navigateToRating() {
    debugger;
    this.router.navigate(['marketer/supplier_rating', this.userData.id]);

  }

  async getImage(filepath: any) {
    this.isImageLoading = true;
    (await this.commonService.getImage(filepath)).subscribe(data => {
      debugger;
      this.createImageFromBlob(data);
      debugger;
      this.isImageLoading = false;
    }, (error: any) => {
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
