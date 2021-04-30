import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RatingService } from 'src/app/Services/rating/rating.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Services/common/common.service';
import { CREATE_MSG } from 'src/app/app-global';

@Component({
  selector: 'app-rate-designer',
  templateUrl: './rate-designer.component.html',
  styleUrls: ['./rate-designer.component.css']
})
export class RateDesignerComponent implements OnInit {
  selected1 = 0;
  selected2 = 0;
  selected3 = 0;
  selected4 = 0;
  hovered = 0;
  readonly = false;
  param: string = '';
  constructor(
    private location: Location,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private commonService: CommonService,

  ) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id') || '';
  }

  backButtonClick() {
    this.location.back()
  }

  onSubmit() {
    console.log(this.selected1);
    this.ratingService.postDesignerRating(
      {
        creativity_skills: this.selected1.toString(),
        technical_skills: this.selected2.toString(),
        business_people: this.selected3.toString(),
        focus_under_pressure: this.selected4.toString(),
        to: this.param,
        user_type: 'designer',

      }).subscribe(data => {
        if (data.success == true) {
          this.toastr.success(CREATE_MSG);
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
