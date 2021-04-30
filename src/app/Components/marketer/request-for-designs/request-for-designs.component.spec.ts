import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForDesignsComponent } from './request-for-designs.component';

describe('RequestForDesignsComponent', () => {
  let component: RequestForDesignsComponent;
  let fixture: ComponentFixture<RequestForDesignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestForDesignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
