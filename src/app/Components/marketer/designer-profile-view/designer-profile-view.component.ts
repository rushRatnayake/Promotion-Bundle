import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile/profile.service';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-designer-profile-view',
  templateUrl: './designer-profile-view.component.html',
  styleUrls: ['./designer-profile-view.component.css']
})
export class DesignerProfileViewComponent implements OnInit {

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
      this.getImage(this.userData.profile_pic);
    });
  }

  navigateToRating() {
    this.router.navigate(['marketer/designer_rating', this.userData.id]);

  }


  async getImage(filepath: any) {
    this.isImageLoading = true;
    (await this.commonService.getImage(filepath)).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, (error: any) => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  imageToShow: any;
  isImageLoading: boolean = true;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


}
