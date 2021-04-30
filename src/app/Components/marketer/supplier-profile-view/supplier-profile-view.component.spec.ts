import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProfileViewComponent } from './supplier-profile-view.component';

describe('SupplierProfileViewComponent', () => {
  let component: SupplierProfileViewComponent;
  let fixture: ComponentFixture<SupplierProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProfileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
