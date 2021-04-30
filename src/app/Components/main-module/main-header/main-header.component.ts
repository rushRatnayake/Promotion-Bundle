import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {

  }

  navigateHome() {
    this.router.navigate(['/']);

  }

  logoutClick() {
    this.authService.logout();
    if (localStorage.getItem('JWT_TOKEN') == null)
      this.router.navigate(['/welcome']);
  }

  

}
