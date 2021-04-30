import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/Services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphic-designer-view',
  templateUrl: './graphic-designer-view.component.html',
  styleUrls: ['./graphic-designer-view.component.css']
})
export class GraphicDesignerViewComponent implements OnInit {

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
