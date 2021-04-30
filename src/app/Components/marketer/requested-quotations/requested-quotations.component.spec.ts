import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedQuotationsComponent } from './requested-quotations.component';

describe('RequestedQuotationsComponent', () => {
  let component: RequestedQuotationsComponent;
  let fixture: ComponentFixture<RequestedQuotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedQuotationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
