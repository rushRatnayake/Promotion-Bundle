import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProfileService } from 'src/app/Services/profile/profile.service';

@Component({
  selector: 'app-designer-profiles',
  templateUrl: './designer-profiles.component.html',
  styleUrls: ['./designer-profiles.component.css']
})
export class DesignerProfilesComponent implements OnInit {


  selected = 3;
  hovered = 0;
  readonly = true;

  cardList: any;

  categoryList = [
    { "id": "Value 1", "name": "Value 1" },
    { "id": "Value 2", "name": "Value 2" },
  ]
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private commonService: CommonService,

  ) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  navigateToDesignerView(list: any) {
    this.router.navigate(['marketer/designer_profile_view/', list._id]);
  }

  async loadDetails() {
    await this.profileService.getAllDesigners().subscribe(data => {
      this.cardList = data.payload.users;

      let count = 0;
      this.cardList.forEach(async (element: any) => {

        if (element.profile_pic != "") {
          this.getImage(element.profile_pic, count);
        } else {
          this.cardList[count].imageToShow = null;
        }
        count++;
      });

    });
  }


  async getImage(url: any, count: any) {
    let filepath = url;
    this.isImageLoading = true;
    (await this.commonService.getImage(filepath)).subscribe(async (data) => {


      await this.createImageFromBlob(data, count);
      this.cardList[count].imageToShow = this.imageToShow;
      this.isImageLoading = false;
    }, (error: any) => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  imageToShow: any;
  isImageLoading: boolean = true;

  async createImageFromBlob(image: Blob, row: any) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      this.cardList[row].imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
