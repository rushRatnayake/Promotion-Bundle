import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/Services/user/user.service';
import { DesignService } from 'src/app/Services/design/design.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-design-view',
  templateUrl: './design-view.component.html',
  styleUrls: ['./design-view.component.css']
})
export class DesignViewComponent implements OnInit {

  designerList: any = [

  ];

  payRangelist: any = [
    {
      id: "10000-20000", name: "10000-20000"
    },
    {
      id: "20000-30000", name: "20000-30000"
    }
  ]

  constructor(
    private router: Router,
    private location: Location,
    private userService: UserService,
    private designService: DesignService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private commonService: CommonService,

  ) { }

  design_id: any;
  design_type: any;
  ngOnInit(): void {
    this.design_id = this.route.snapshot.paramMap.get('id');
    this.design_type = this.route.snapshot.paramMap.get('type');
    this.loadDetails();
  }

  backButtonClick() {
    this.location.back()
  }

  async loadDetails() {
    await this.designService.getAcceptor(this.design_id).subscribe(data => {
      this.designerList = data.payload.acceptors;

    });
  }

  sendClicked(row: any) {
    this.designerList[row];
    var obj = {
      "status": "confirmed",
      "images": this.designerList[row].images,
      "price": this.designerList[row].price,
      "confirmed_designer": this.designerList[row].designer_id
    }

    this.designService.putConfirmDesign(obj, this.design_id).subscribe(data => {
      if (data.success == true) {
        this.spinner.hide();
        this.toastr.success(data.payload);
        this.loadDetails();

      }
      else {
        this.toastr.error("Error");
        this.spinner.hide();
      }
    });

  }

  priceChange(row: any, event: any) {
    this.designerList[row].price = event.target.value;
  }

  emailChange(row: any, event: any) {
    this.designerList[row].email = event.target.value;
  }


  onFileChange(event: any, line: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.commonService.postImage(formData).subscribe(data => {
        debugger;
        this.designerList[line].images = [data.payload.file_path];
      });

    }
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
