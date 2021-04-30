import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Services/auth/guards/auth.guard';
import { DesignerProfileComponent } from './designer-profile/designer-profile.component';
import { DesignerRegisterComponent } from './designer-register/designer-register.component';
import { RequestRecievedProjectsComponent } from './request-recieved-projects/request-recieved-projects.component';

const routes: Routes = [
  {
    path: 'register',
    component: DesignerRegisterComponent
  },
  {
    path: 'profile',
    component: DesignerProfileComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'projects',
    component: RequestRecievedProjectsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
