import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignerRegisterComponent } from '../designer/designer-register/designer-register.component';
import { MarketerRegisterComponent } from '../marketer/marketer-register/marketer-register.component';
import { SupplierRegisterComponent } from '../supplier/supplier-register/supplier-register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'login/:id',
    component: LoginComponent
  },
  {
    path: 'forgot_password',
    component: ForgotPasswordComponent
  },
  {
    path: 'marketer_register',
    component: MarketerRegisterComponent
  },
  {
    path: 'supplier_register',
    component: SupplierRegisterComponent
  },
  {
    path: 'designer_register',
    component: DesignerRegisterComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
