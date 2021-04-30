import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketDashboardComponent } from './dashboard/market-dashboard/market-dashboard.component';
import { GraphicDesignerListComponent } from './graphic-designer/graphic-designer-list/graphic-designer-list.component';
import { GraphicDesignerViewComponent } from './graphic-designer/graphic-designer-view/graphic-designer-view.component';
import { MarketerListComponent } from './marketer/marketer-list/marketer-list.component';
import { MarketerViewComponent } from './marketer/marketer-view/marketer-view.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { SupplierViewComponent } from './supplier/supplier-view/supplier-view.component';

const routes: Routes = [
  {
    path: 'marketer_list',
    component: MarketerListComponent
  },
  {
    path: 'marketer_view/:id',
    component: MarketerViewComponent
  },

  {
    path: 'supplier_list',
    component: SupplierListComponent
  },
  {
    path: 'supplier_view/:id',
    component: SupplierViewComponent
  },

  {
    path: 'graphicdesigner_list',
    component: GraphicDesignerListComponent
  },
  {
    path: 'graphicdesigner_view/:id',
    component: GraphicDesignerViewComponent
  },

  {
    path: 'market_dashboard',
    component: MarketDashboardComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
