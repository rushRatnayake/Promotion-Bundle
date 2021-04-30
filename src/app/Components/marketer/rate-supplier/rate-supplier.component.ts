import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RatingService } from 'src/app/Services/rating/rating.service';
import { UPDATE_MSG, CREATE_MSG } from 'src/app/app-global';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Services/common/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rate-supplier',
  templateUrl: './rate-supplier.component.html',
  styleUrls: ['./rate-supplier.component.css']
})
export class RateSupplierComponent implements OnInit {
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
    this.ratingService.postSupplierRating(
      {
        delivery_of_supplies: this.selected1.toString(),
        quality_displayed_by_supplier: this.selected2.toString(),
        service_given_by_supplier: this.selected3.toString(),
        set_pricing_by_supplier: this.selected4.toString(),
        user_type: 'supplier',
        to: this.param
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
