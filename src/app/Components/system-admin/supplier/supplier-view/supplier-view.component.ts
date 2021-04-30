import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/Services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-view',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.css']
})
export class SupplierViewComponent implements OnInit {

  userdetails: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  id!: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadDetails();
  }

  backButtonClick() {
    this.location.back()
  }

  async loadDetails() {
    await this.userService.getSupplierById(this.id).subscribe(data => {
      this.userdetails = data.payload;
    });
  }


}
