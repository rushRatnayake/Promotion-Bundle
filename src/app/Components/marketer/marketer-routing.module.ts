import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Services/auth/guards/auth.guard';
import { CatalogueProductsComponent } from './catalogue-products/catalogue-products.component';
import { CatalogueSingleProductComponent } from './catalogue-single-product/catalogue-single-product.component';
import { DesignViewComponent } from './design-view/design-view.component';
import { DesignerProfileViewComponent } from './designer-profile-view/designer-profile-view.component';
import { DesignerProfilesComponent } from './designer-profiles/designer-profiles.component';
import { ManageCompanyProductsComponent } from './manage-company-products/manage-company-products.component';
import { MarketerDashboardComponent } from './marketer-dashboard/marketer-dashboard.component';
import { MarketerProfilesComponent } from './marketer-profiles/marketer-profiles.component';
// import { MarketerProfileComponent } from './marketer-profile/marketer-profile.component';
import { MarketerRegisterComponent } from './marketer-register/marketer-register.component';
import { RateDesignerComponent } from './rate-designer/rate-designer.component';
import { RateSupplierComponent } from './rate-supplier/rate-supplier.component';
import { RequestForDesignsComponent } from './request-for-designs/request-for-designs.component';
import { RequestedQuotationOrderStatusComponent } from './requested-quotation-order-status/requested-quotation-order-status.component';
import { RequestedQuotationsComponent } from './requested-quotations/requested-quotations.component';
import { SupplierProfileViewComponent } from './supplier-profile-view/supplier-profile-view.component';
import { SupplierProfilesComponent } from './supplier-profiles/supplier-profiles.component';
import { ViewRecommendedProductsComponent } from './view-recommended-products/view-recommended-products.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MarketerDashboardComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'profile',
    component: MarketerProfilesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'catalogue_products',
    component: CatalogueProductsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'view_recommended_products',
    component: ViewRecommendedProductsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'catalogue_products',
    component: CatalogueProductsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'catalogue_single_product/:id',
    component: CatalogueSingleProductComponent
  },
  {
    path: 'manage_company_products',
    component: ManageCompanyProductsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'requested_quotations',
    component: RequestedQuotationsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'requested_quotation_order_status/:id',
    component: RequestedQuotationOrderStatusComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'request_for_design',
    component: RequestForDesignsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'design_view/:id/:type',
    component: DesignViewComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'supplier_profiles',
    component: SupplierProfilesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'supplier_profile_view/:id',
    component: SupplierProfileViewComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'designer_profiles',
    component: DesignerProfilesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'designer_profile_view/:id',
    component: DesignerProfileViewComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  // {
  //   path: 'register',
  //   component: MarketerRegisterComponent
  // },
  {
    path: 'supplier_rating/:id',
    component: RateSupplierComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'designer_rating/:id',
    component: RateDesignerComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketerRoutingModule { }
