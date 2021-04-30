import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSupplierComponent } from './rate-supplier.component';

describe('RateSupplierComponent', () => {
  let component: RateSupplierComponent;
  let fixture: ComponentFixture<RateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
