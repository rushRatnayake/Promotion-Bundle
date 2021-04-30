import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DELETE_MSG } from 'src/app/app-global';
import { CommonService } from 'src/app/Services/common/common.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  id!: any;

  productList: any = [
  ];

  ngOnInit(): void {
    this.loadDetails();
  }

  addProduct() {
    this.router.navigate(['supplier/add_product/', 'add']);
  }

  editProduct(list: any) {

    this.router.navigate(['supplier/edit_product', list._id, "add_edit"]);
  }

  async loadDetails() {
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data.payload.products;
      let count = 0;
      this.productList.forEach(async (element: any) => {
        if (element.img_url != "") {
          this.getImage(element.img_url, count);
        } else {
          this.productList[count].imageToShow = null;
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
      this.productList[count].imageToShow = this.imageToShow;
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
      this.productList[row].imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
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

}
