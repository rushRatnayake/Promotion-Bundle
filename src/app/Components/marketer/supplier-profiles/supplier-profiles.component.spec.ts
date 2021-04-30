import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProfilesComponent } from './supplier-profiles.component';

describe('SupplierProfilesComponent', () => {
  let component: SupplierProfilesComponent;
  let fixture: ComponentFixture<SupplierProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
