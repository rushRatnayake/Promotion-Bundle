import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Location } from '@angular/common';
import { CREATE_MSG, UPDATE_MSG } from 'src/app/app-global';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/Services/common/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/Services/product/product.service';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  productCategoryList = [
    { id: "Category 1", name: "Category 1" },
    { id: "Category 2", name: "Category 2" },
  ];

  form_type: any = 'add_edit';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private productService: ProductService,
    private commonService: CommonService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  currentUser: any;
  id!: any;
  title!: any;


  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(data => this.currentUser = data);
    this.id = this.route.snapshot.paramMap.get('id');
    this.form_type = this.route.snapshot.paramMap.get('type');
    this.loadform();
    this.loadCategories();
    if (this.id != undefined) {
      this.loadDetails();
    }

    if (this.form_type == "add_edit") {
      this.title = "Edit Product";
    }
    if (this.form_type == "add") {
      this.title = "Add Product";
    }

  }

  product: any;
  categories: any;

  async loadDetails() {

    await this.productService.getSingleProduct(this.id).subscribe(data => {
      this.product = data.payload;
      // var detail = this.product.find((element: { _id: any; }) => element._id == this.id);
      this.formHeader.patchValue(this.product);
      this.getImage();
    });
    // await this.productService.getAllProducts().subscribe(data => {
    //   this.product = data.payload.products;
    //   var detail = this.product.find((element: { _id: any; }) => element._id == this.id);
    //   this.formHeader.patchValue(detail);
    // });
  }

  async loadCategories() {

    await this.productService.getProductCategories().subscribe(data => {
      this.categories = data.payload.categories;
    });

  }


  formHeader!: FormGroup;
  dim!: FormGroup;

  loadform() {
    this.formHeader = this.formBuilder.group({
      'name': [''],
      'brand': [''],
      'price': [''],
      'category': [''],
      'dim': new FormGroup({
        'l': new FormControl(''),
        'w': new FormControl(''),
        'h': new FormControl('')
      }),
      'weight': [''],
      'volume': [''],
      'specification': [''],
      'description': [''],
      'img_url': [''],
      '_id': [''],
    });
  }



  editClick() {
    console.log("Edit Clicked");
  }


  checked: boolean = false;
  onSubmit() {
    this.spinner.show();
    if (this.formHeader?.invalid) {
      this.checked = true;
      this.toastr.warning('Please fill all required fields!');
      this.spinner.hide();
    }
    if (!this.formHeader?.invalid) {
      this.checked = false;

      if (this.id != undefined) { // UPDATE
        this.productService.updateProduct(this.formHeader?.value, this.id).subscribe(data => {
          if (data.success == true) {
            this.toastr.success(UPDATE_MSG);
            this.loadDetails();
            setTimeout(() => {
              this.spinner.hide();
            }, 500);
          }
          else {
            this.toastr.error(data.error.message);
            this.spinner.hide();
          }
        });
      } else {  // ADD
        this.productService.postProduct(this.formHeader?.value).subscribe(data => {
          if (data.success == true) {
            this.toastr.success(CREATE_MSG);
            this.loadDetails();
            setTimeout(() => {
              this.spinner.hide();
            }, 500);

            this.formHeader.reset();
          }
          else {
            this.toastr.error("Error");
            this.spinner.hide();
          }
        });
      }

    }
  }

  backButtonClick() {
    this.location.back()
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.commonService.postImage(formData).subscribe(data => {

        this.formHeader.patchValue({
          "img_url": data.payload.file_path
        })
        this.getImage();
      });

    }
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formHeader.patchValue({
          img_url: reader.result
        });
      };
    }

  }


  async getImage() {
    let filepath = this.formHeader.get('img_url')!.value;
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
