import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyProductsComponent } from './manage-company-products.component';

describe('ManageCompanyProductsComponent', () => {
  let component: ManageCompanyProductsComponent;
  let fixture: ComponentFixture<ManageCompanyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompanyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompanyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
