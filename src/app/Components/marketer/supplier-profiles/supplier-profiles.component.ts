import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProfileService } from 'src/app/Services/profile/profile.service';

@Component({
  selector: 'app-supplier-profiles',
  templateUrl: './supplier-profiles.component.html',
  styleUrls: ['./supplier-profiles.component.css']
})
export class SupplierProfilesComponent implements OnInit {

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

  navigateToSupplierView(list: any) {
    this.router.navigate(['marketer/supplier_profile_view', list._id]);

  }



  async loadDetails() {
    await this.profileService.getAllSuppliers().subscribe(data => {
      this.cardList = data.payload.users;

      let count = 0;
      this.cardList.forEach(async (element: any) => {

        if (element.company_pic != "") {
          this.getImage(element.company_pic, count);
        } else {
          this.cardList[count].imageToShow = null;
        }
        count++;
      });

    });
    this.cardList;
    console.log(this.cardList[0].ratings);
    
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
