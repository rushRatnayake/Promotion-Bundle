import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemAdminRoutingModule } from './system-admin-routing.module';
import { MarketerListComponent } from './marketer/marketer-list/marketer-list.component';
import { MarketerViewComponent } from './marketer/marketer-view/marketer-view.component';
import { SupplierViewComponent } from './supplier/supplier-view/supplier-view.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { GraphicDesignerListComponent } from './graphic-designer/graphic-designer-list/graphic-designer-list.component';
import { GraphicDesignerViewComponent } from './graphic-designer/graphic-designer-view/graphic-designer-view.component';
import { MarketDashboardComponent } from './dashboard/market-dashboard/market-dashboard.component';


@NgModule({
  declarations: [MarketerListComponent, MarketerViewComponent, SupplierViewComponent, SupplierListComponent, GraphicDesignerListComponent, GraphicDesignerViewComponent, MarketDashboardComponent],
  imports: [
    CommonModule,
    SystemAdminRoutingModule
  ]
})
export class SystemAdminModule { }
