import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecommendedProductsComponent } from './view-recommended-products.component';

describe('ViewRecommendedProductsComponent', () => {
  let component: ViewRecommendedProductsComponent;
  let fixture: ComponentFixture<ViewRecommendedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecommendedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecommendedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
