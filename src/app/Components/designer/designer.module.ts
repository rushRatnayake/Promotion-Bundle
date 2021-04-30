import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignerRoutingModule } from './designer-routing.module';
import { DesignerRegisterComponent } from './designer-register/designer-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { DesignerProfileComponent } from './designer-profile/designer-profile.component';
import { RequestRecievedProjectsComponent } from './request-recieved-projects/request-recieved-projects.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [DesignerRegisterComponent, DesignerProfileComponent, RequestRecievedProjectsComponent],
  imports: [
    CommonModule,
    DesignerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesignerModule { }
