import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketerRoutingModule } from './marketer-routing.module';
import { MarketerDashboardComponent } from './marketer-dashboard/marketer-dashboard.component';
// import { MarketerProfileComponent } from './marketer-profile/marketer-profile.component';
import { CatalogueProductsComponent } from './catalogue-products/catalogue-products.component';
import { ViewRecommendedProductsComponent } from './view-recommended-products/view-recommended-products.component';
import { ManageCompanyProductsComponent } from './manage-company-products/manage-company-products.component';
import { RequestedQuotationsComponent } from './requested-quotations/requested-quotations.component';
import { RequestForDesignsComponent } from './request-for-designs/request-for-designs.component';
import { SupplierProfilesComponent } from './supplier-profiles/supplier-profiles.component';
import { MarketerRegisterComponent } from './marketer-register/marketer-register.component';
import { MarketerProfilesComponent } from './marketer-profiles/marketer-profiles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { CatalogueSingleProductComponent } from './catalogue-single-product/catalogue-single-product.component';
import { RequestedQuotationOrderStatusComponent } from './requested-quotation-order-status/requested-quotation-order-status.component';
import { DesignViewComponent } from './design-view/design-view.component';
import { SupplierProfileViewComponent } from './supplier-profile-view/supplier-profile-view.component';
import { DesignerProfilesComponent } from './designer-profiles/designer-profiles.component';
import { DesignerProfileViewComponent } from './designer-profile-view/designer-profile-view.component';
import { RateSupplierComponent } from './rate-supplier/rate-supplier.component';
import { RateDesignerComponent } from './rate-designer/rate-designer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MarketerDashboardComponent, CatalogueProductsComponent, ViewRecommendedProductsComponent, ManageCompanyProductsComponent, RequestedQuotationsComponent, RequestForDesignsComponent, SupplierProfilesComponent, MarketerRegisterComponent, MarketerProfilesComponent, CatalogueSingleProductComponent, RequestedQuotationOrderStatusComponent, DesignViewComponent, SupplierProfileViewComponent, DesignerProfilesComponent, DesignerProfileViewComponent, RateSupplierComponent, RateDesignerComponent],
  imports: [
    CommonModule,
    MarketerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule, // ToastrModule added
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class MarketerModule { }
