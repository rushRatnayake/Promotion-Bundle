import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerRegisterComponent } from './designer-register.component';

describe('DesignerRegisterComponent', () => {
  let component: DesignerRegisterComponent;
  let fixture: ComponentFixture<DesignerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
