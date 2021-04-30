import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DELETE_MSG } from 'src/app/app-global';
import { CommonService } from 'src/app/Services/common/common.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplierList: any = [
    // {
    //   id: 1, full_name: "Supplier Name 1", date: "2021-01-01", status: "", last_login: ""
    // },
    // {
    //   id: 2, full_name: "Supplier Name 2", date: "2021-01-01", status: "", last_login: ""
    // },
    // {
    //   id: 3, full_name: "Supplier Name 3", date: "2021-01-01", status: "", last_login: ""
    // },
    // {
    //   id: 4, full_name: "Supplier Name 4", date: "2021-01-01", status: "", last_login: ""
    // },
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  viewProfile(list: any) {
    this.router.navigate(['system_admin_module/supplier_view/', list._id]);
  }

  async loadDetails() {
    await this.userService.getSupplierList().subscribe(data => {
      debugger;
      this.supplierList = data.payload.users;

    });
  }


  onDelete(list: any) {
    this.userService.deleteUser(list._id).subscribe(data => {
      if (data.success == true) {
        this.toastr.success(DELETE_MSG);
        this.loadDetails();
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
      else {
        this.toastr.error("Error");
        this.spinner.hide();
      }
    });
  }

}
