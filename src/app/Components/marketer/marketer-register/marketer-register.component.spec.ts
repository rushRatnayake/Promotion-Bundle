import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerRegisterComponent } from './marketer-register.component';

describe('MarketerRegisterComponent', () => {
  let component: MarketerRegisterComponent;
  let fixture: ComponentFixture<MarketerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
