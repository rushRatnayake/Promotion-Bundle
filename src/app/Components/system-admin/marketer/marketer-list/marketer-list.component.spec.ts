import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerListComponent } from './marketer-list.component';

describe('MarketerListComponent', () => {
  let component: MarketerListComponent;
  let fixture: ComponentFixture<MarketerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
