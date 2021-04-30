import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DELETE_MSG } from 'src/app/app-global';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-manage-company-products',
  templateUrl: './manage-company-products.component.html',
  styleUrls: ['./manage-company-products.component.css']
})
export class ManageCompanyProductsComponent implements OnInit {

  cardList: any = []

  productList: any = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  navigateToProduct(list: any) {
    debugger;
    this.router.navigate(['supplier/edit_product/', list._id, "add_edit"]);
  }


  async loadDetails() {
    await this.productService.getAllProducts().subscribe(data => {
      // this.formHeader.patchValue(data.payload);
      debugger;
      this.cardList = data.payload.products;

      let count = 0;
      this.cardList.forEach(async (element: any) => {

        if (element.img_url != "") {
          this.getImage(element.img_url, count);
        } else {
          this.cardList[count].imageToShow = null;
        }
        count++;
      });

    });
  }

  onDelete(list: any) {
    this.productService.deleteProduct(list._id).subscribe(data => {
      if (data.success == true) {
        this.toastr.success(DELETE_MSG);
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
