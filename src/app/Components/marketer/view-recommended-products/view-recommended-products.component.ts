import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-view-recommended-products',
  templateUrl: './view-recommended-products.component.html',
  styleUrls: ['./view-recommended-products.component.css']
})
export class ViewRecommendedProductsComponent implements OnInit {

  cardList: any = []
  companyProductList: any = []


  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private commonService: CommonService,

  ) { }

  ngOnInit(): void {
    this.loadCompanyProducts();
    // this.loadDetails();
  }

  navigateToProduct(list: any) {
    // this.router.navigate(['marketer/catalogue_single_product', list._id]);
    // this.router.navigate(['supplier/edit_product/', list._id, "view"]);
    this.router.navigate(['marketer/catalogue_single_product/', list._id]);

  }

  loadDetails(id: any) {
    this.spinner.show();
    this.productService.getRecommendedProducts(id).subscribe(data => {
      // this.formHeader.patchValue(data.payload);
      debugger;
      this.spinner.hide();
      this.cardList = data.payload[0].products;

      let count = 0;
      this.cardList.forEach(async (element: any) => {

        if (element.img_url != "") {
          this.getImage(element.img_url, count);
        } else {
          this.cardList[count].imageToShow = null;
        }
        count++;
      });

    },
      err => {
        this.spinner.hide();
        this.toastr.error("Server Error");

      });
  }

  async loadCompanyProducts() {
    await this.productService.getAllProducts().subscribe(data => {
      this.companyProductList = data.payload.products;
    });
  }

  onProductChange(event: any) {
    debugger;
    this.loadDetails(event._id);
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
