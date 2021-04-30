import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Services/product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { QuotationService } from 'src/app/Services/quotation/quotation.service';
import { UserService } from 'src/app/Services/user/user.service';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-catalogue-single-product',
  templateUrl: './catalogue-single-product.component.html',
  styleUrls: ['./catalogue-single-product.component.css']
})
export class CatalogueSingleProductComponent implements OnInit {

  productList: any = [];
  supplierList: any;
  supplier: any;
  id!: any;
  price: any = 0;
  qty: any = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private quotationService: QuotationService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadDetails();
    this.loadProducts();
    this.loadSuppliers();
  }

  editClick() {
    console.log("Edit Clicked");
  }

  logoutClick() {
    this.authService.logout();
    if (localStorage.getItem('JWT_TOKEN') == null)
      this.router.navigate(['/welcome']);
  }

  backButtonClick() {
    this.location.back()
  }

  product: any;
  productObject: any;
  loadDetails() {

    // this.spinner.show();
    this.productService.getSingleProduct(this.id).subscribe(data => {

      this.product = data.payload;
      // var detail = this.product.find((element: { _id: any; }) => element._id == this.id);
      this.productObject = this.product;
      // this.spinner.hide();
      this.getImage(this.productObject.img_url);

    });
  }

  async loadProducts() {
    await this.productService.getAllProducts().subscribe(data => {
      this.productList = data.payload.products;
    });
  }

  async loadSuppliers() {
    await this.userService.getSupplierList().subscribe(data => {
      debugger;
      this.supplierList = data.payload.users;
      this.supplier = this.supplierList.find((element: { _id: string; }) => element._id == this.product.user_id);

    });
  }

  async onProductChange(event: any) {

    await this.productService.getBundlePrice(this.id, event._id).subscribe(data => {
      this.price = data.payload.price;
    });
  }

  onRFQ() {
    var obj = {
      "product_id": this.productObject._id,
      "product_name": this.productObject.name,
      "quantity": this.qty,
      "date": this.productObject.created_at,
      "to": this.productObject.user_id
    }
    this.spinner.show();
    this.quotationService.postQuotations(obj).subscribe(data => {
      if (data.success == true) {
        this.spinner.hide();
        this.toastr.success(data.payload);
      }
      else {
        this.toastr.error("Error");
        this.spinner.hide();
      }
    });

  }

  onQty(event: any) {
    this.qty = event.target.value;
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
