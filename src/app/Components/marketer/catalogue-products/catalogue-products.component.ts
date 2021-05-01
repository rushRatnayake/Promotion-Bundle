import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DELETE_MSG } from 'src/app/app-global';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-catalogue-products',
  templateUrl: './catalogue-products.component.html',
  styleUrls: ['./catalogue-products.component.css']
})
export class CatalogueProductsComponent implements OnInit {

  cardList: any = [];
  loadedList = [];
  searchValue : any = '';
  categoryList = [
    { "id": "", "name": "" },
    { "id": "Category 1", "name": "Category 1" },
    { "id": "Category 2", "name": "Category 2" },
  ]
  category:String = '';
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
    this.router.navigate(['marketer/catalogue_single_product/', list._id]);
  }


  async loadDetails() {
    this.productService.getSupplierProducts().subscribe(data => {
      // this.formHeader.patchValue(data.payload);
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
      this.loadedList = this.cardList;

    });
  }

  async searchProduct(){
    if(this.searchValue == ''){
      await this.loadDetails();
    }else{
      this.productService.searchProductByName(this.searchValue).subscribe(data =>{
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
  }

  async filterByCategory(){
    if(this.category == ''){
      await this.loadDetails();
    }else{
      this.productService.searchProduct(this.category).subscribe(data =>{
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
