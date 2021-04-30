import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedQuotationOrderStatusComponent } from './requested-quotation-order-status.component';

describe('RequestedQuotationOrderStatusComponent', () => {
  let component: RequestedQuotationOrderStatusComponent;
  let fixture: ComponentFixture<RequestedQuotationOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedQuotationOrderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedQuotationOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
