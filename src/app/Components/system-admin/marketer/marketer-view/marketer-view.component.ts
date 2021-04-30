import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';


@Component({
  selector: 'app-marketer-view',
  templateUrl: './marketer-view.component.html',
  styleUrls: ['./marketer-view.component.css']
})
export class MarketerViewComponent implements OnInit {

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
    await this.userService.getMarketerById(this.id).subscribe(data => {
      this.userdetails = data.payload;
    });
  }


}
