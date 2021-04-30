import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerProfileViewComponent } from './designer-profile-view.component';

describe('DesignerProfileViewComponent', () => {
  let component: DesignerProfileViewComponent;
  let fixture: ComponentFixture<DesignerProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerProfileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
