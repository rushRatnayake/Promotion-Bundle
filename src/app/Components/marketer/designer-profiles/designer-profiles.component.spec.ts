import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerProfilesComponent } from './designer-profiles.component';

describe('DesignerProfilesComponent', () => {
  let component: DesignerProfilesComponent;
  let fixture: ComponentFixture<DesignerProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
