import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DELETE_MSG } from 'src/app/app-global';
import { CommonService } from 'src/app/Services/common/common.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-marketer-list',
  templateUrl: './marketer-list.component.html',
  styleUrls: ['./marketer-list.component.css']
})
export class MarketerListComponent implements OnInit {

  marketerList: any = [
    // {
    //   _id: 1, full_name: "Marketer Name 1", date: "2021-01-01", status: "", last_login: ""
    // },
    // {
    //   _id: 2, full_name: "Marketer Name 2", date: "2021-01-01", status: "", last_login: ""
    // },
    // {
    //   _id: 3, full_name: "Marketer Name 3", date: "2021-01-01", status: "", last_login: ""
    // },
    // {
    //   _id: 4, full_name: "Marketer Name 4", date: "2021-01-01", status: "", last_login: ""
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
    this.router.navigate(['system_admin_module/marketer_view/', list._id]);
  }

  async loadDetails() {
    await this.userService.getMarketerList().subscribe(data => {
      debugger;
      this.marketerList = data.payload.users;

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
