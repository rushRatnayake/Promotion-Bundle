import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRecievedProjectsComponent } from './request-recieved-projects.component';

describe('RequestRecievedProjectsComponent', () => {
  let component: RequestRecievedProjectsComponent;
  let fixture: ComponentFixture<RequestRecievedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRecievedProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRecievedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
