import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDesignerComponent } from './rate-designer.component';

describe('RateDesignerComponent', () => {
  let component: RateDesignerComponent;
  let fixture: ComponentFixture<RateDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateDesignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
