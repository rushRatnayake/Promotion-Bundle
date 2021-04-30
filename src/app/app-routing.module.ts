import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModuleComponent } from './Components/main-module/main-module/main-module.component';
import { AuthGuard } from './Services/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./Components/authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '',
    component: MainModuleComponent,
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
    children: [
      {
        path: 'system_admin_module',
        loadChildren: () => import('./Components/system-admin/system-admin.module').then(m => m.SystemAdminModule)
      },
      {
        path: 'graphic_designer',
        loadChildren: () => import('./Components/designer/designer.module').then(m => m.DesignerModule)
      },
      {
        path: 'supplier',
        loadChildren: () => import('./Components/supplier/supplier.module').then(m => m.SupplierModule)
      },
      {
        path: 'marketer',
        loadChildren: () => import('./Components/marketer/marketer.module').then(m => m.MarketerModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
