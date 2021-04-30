import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  loadForm() {
    this.loginForm = this.formBuilder.group({
      'Login_Email': ['', Validators.required],
      'Login_Password': ['', Validators.required],
    });

  }


  param: any = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    this.loadForm();


  }

  onSignInSubmit() {
    try {
      this.authService.login(
        {
          email: this.loginForm.controls['Login_Email'].value,
          password: this.loginForm.controls['Login_Password'].value,
          role: this.param
        }
      )
        .subscribe(success => {
          console.log(success);
          console.log(success.detail);
          if (success.success == true) {
            this.authService.getUserDetails();
          }
          else {
            this.toastr.error("Username or password is invalid");
            console.log(success.detail);
          }
        });

    } catch (error) {
      console.log(error);
    }

  }

  forgotPasswordClick() {
    this.router.navigate(['welcome/forgot_password/']);
  }

  registerClick() {
    if (this.param == "marketer")
      this.router.navigate(['welcome/marketer_register/']);
    else if (this.param == "supplier")
      this.router.navigate(['welcome/supplier_register/']);
    else if (this.param == "designer")
      this.router.navigate(['welcome/designer_register/']);

  }

}
