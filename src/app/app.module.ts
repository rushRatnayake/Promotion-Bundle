import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './Components/main-module/main-header/main-header.component';
import { MainModuleComponent } from './Components/main-module/main-module/main-module.component';
import { MainSideMenuComponent } from './Components/main-module/main-side-menu/main-side-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './Services/auth/auth.service';
import { TokenInterceptor } from './Services/auth/token.interceptor';
import { AuthGuard } from './Services/auth/guards/auth.guard';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainModuleComponent,
    MainHeaderComponent,
    MainSideMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgbModule, // ToastrModule added

  ],
  providers: [
    DatePipe,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
