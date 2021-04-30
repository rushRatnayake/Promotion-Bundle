import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQuotationViewComponent } from './request-quotation-view.component';

describe('RequestQuotationViewComponent', () => {
  let component: RequestQuotationViewComponent;
  let fixture: ComponentFixture<RequestQuotationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestQuotationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQuotationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
