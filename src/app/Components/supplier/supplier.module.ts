import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';
import { SupplierProfileComponent } from './supplier-profile/supplier-profile.component';
import { RequestQuotationListComponent } from './request-quotation-list/request-quotation-list.component';
import { RequestQuotationViewComponent } from './request-quotation-view/request-quotation-view.component';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddEditProductComponent, ManageProductsComponent, SupplierRegisterComponent, SupplierProfileComponent, RequestQuotationListComponent, RequestQuotationViewComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class SupplierModule { }
