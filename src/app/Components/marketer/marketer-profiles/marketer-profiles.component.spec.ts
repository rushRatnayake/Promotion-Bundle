import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerProfilesComponent } from './marketer-profiles.component';

describe('MarketerProfilesComponent', () => {
  let component: MarketerProfilesComponent;
  let fixture: ComponentFixture<MarketerProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
