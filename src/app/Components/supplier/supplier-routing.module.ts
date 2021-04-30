import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Services/auth/guards/auth.guard';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { RequestQuotationListComponent } from './request-quotation-list/request-quotation-list.component';
import { RequestQuotationViewComponent } from './request-quotation-view/request-quotation-view.component';
import { SupplierProfileComponent } from './supplier-profile/supplier-profile.component';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';

const routes: Routes = [
  // {
  //   path: 'register',
  //   component: SupplierRegisterComponent
  // },
  {
    path: 'profile',
    component: SupplierProfileComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'manage_products',
    component: ManageProductsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'add_product/:type',
    component: AddEditProductComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'edit_product/:id/:type',
    component: AddEditProductComponent,
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
  },
  {
    path: 'quotation_list',
    component: RequestQuotationListComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'quotation_view/:id',
    component: RequestQuotationViewComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
